import * as core from "@actions/core";
import * as github from "@actions/github";

import { CloudFront, Route53 } from "aws-sdk";
import {
  CreateDistributionWithTagsResult,
  GetDistributionResult,
} from "aws-sdk/clients/cloudfront";
import { ChangeResourceRecordSetsResponse } from "aws-sdk/clients/route53";

const cloudfront = new CloudFront();
const route53 = new Route53();

const owner = "teia-bot";

async function run(): Promise<void> {
  try {
    const namespace = core.getInput("namespace")?.trim() ?? "";
    const bucket = core.getInput("bucket")?.trim() ?? "";
    const domainName = core.getInput("domainName")?.trim() ?? "";
    const certificateId = core.getInput("certificateId")?.trim() ?? "";
    const hostedZoneId = core.getInput("hostedZoneId")?.trim() ?? "";
    const aliasHostedZoneId = core.getInput("aliasHostedZoneId")?.trim() ?? "";
    const originAccessIdentity =
      core.getInput("originAccessIdentity")?.trim() ?? "";
    const repoToken =
      core.getInput("repo-token") || process.env["GITHUB_TOKEN"];

    const octokit = github.getOctokit(String(repoToken));

    const alias = `${namespace}.${domainName}`;

    console.log("Bucket:", bucket);
    console.log("Namespace:", namespace);
    console.log("Origin Access Identity:", originAccessIdentity);
    console.log("Aliases", alias);
    console.log("Certificate ID", certificateId);

    // TODO: Get distribution ID from comments
    const comments = await octokit.issues
      .listComments({
        ...github.context.issue,
        issue_number: github.context.issue.number,
      })
      .catch(() => []);

    const previousDeployComment = (comments as any)?.data.find(
      (comment: any) => {
        if (!comment.user.login.match(/teia/gi)) return false;
        if (!comment.body.match(/deploy/gi)) return false;
        return true;
      }
    );
    console.log("DIST ID", previousDeployComment.body.match(/<!-- .* -->/g));
    const distributionId = "EBIT5IZWT1WEF";

    console.log(previousDeployComment);

    // TODO: check if distribution already exists
    const existingDistributionData: GetDistributionResult = await new Promise(
      (resolve, reject) =>
        cloudfront.getDistribution({ Id: distributionId }, (error, data) =>
          error ? reject(error) : resolve(data)
        )
    );

    console.log("existingDistributionData");
    console.log(existingDistributionData);
    let existingDistributionId = existingDistributionData.Distribution?.Id;

    let distributionResult: CreateDistributionWithTagsResult;
    if (!existingDistributionId) {
      distributionResult = await new Promise((resolve, reject) =>
        cloudfront.createDistributionWithTags(
          {
            DistributionConfigWithTags: {
              DistributionConfig: {
                Enabled: true,
                CallerReference: "STRING_VALUE" /* required */, // TODO:
                Comment: "",
                DefaultCacheBehavior: {
                  TargetOriginId: namespace,
                  ViewerProtocolPolicy: "redirect-to-https",
                  AllowedMethods: {
                    Items: ["HEAD", "GET"],
                    Quantity: 2,
                    CachedMethods: { Items: ["HEAD", "GET"], Quantity: 2 },
                  },
                  CachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6",
                  Compress: true,
                  FieldLevelEncryptionId: "",
                  LambdaFunctionAssociations: { Quantity: 0 },
                  SmoothStreaming: false,
                  TrustedKeyGroups: {
                    Enabled: false,
                    Quantity: 0,
                  },
                  TrustedSigners: {
                    Enabled: false,
                    Quantity: 0,
                  },
                },
                Origins: {
                  Quantity: 1,
                  Items: [
                    {
                      DomainName: `${bucket}.s3.amazonaws.com`,
                      Id: namespace,
                      ConnectionAttempts: 3,
                      ConnectionTimeout: 10,
                      CustomHeaders: { Quantity: 0 },
                      OriginPath: `/${namespace}`,
                      OriginShield: { Enabled: false },
                      S3OriginConfig: {
                        OriginAccessIdentity: originAccessIdentity,
                      },
                    },
                  ],
                },
                Aliases: { Quantity: 1, Items: [alias] },
                CacheBehaviors: { Quantity: 0 },
                CustomErrorResponses: {
                  Quantity: 2,
                  Items: [
                    {
                      ErrorCode: 404,
                      ErrorCachingMinTTL: 86400,
                      ResponseCode: "200",
                      ResponsePagePath: "/index.html",
                    },
                    {
                      ErrorCode: 403,
                      ErrorCachingMinTTL: 86400,
                      ResponseCode: "200",
                      ResponsePagePath: "/index.html",
                    },
                  ],
                },
                DefaultRootObject: "STRING_VALUE",
                HttpVersion: "http2",
                IsIPV6Enabled: true,
                OriginGroups: { Quantity: 0 },
                PriceClass: "PriceClass_All",
                ViewerCertificate: {
                  ACMCertificateArn: certificateId,
                  Certificate: certificateId,
                  CertificateSource: "acm",
                  SSLSupportMethod: "sni-only",
                  MinimumProtocolVersion: "TLSv1.1_2016",
                },
                WebACLId: "",
              },
              Tags: {
                Items: [
                  { Key: "DEPLOY_TYPE", Value: "PREVIEW" },
                  { Key: "NAMESPACE", Value: namespace },
                  { Key: "DOMAIN_NAME", Value: domainName },
                ],
              },
            },
          },
          (error, data) => {
            if (error) reject(error);
            resolve(data);
          }
        )
      );

      const cloudFrontDomainName = distributionResult.Distribution?.DomainName;

      if (!cloudFrontDomainName) {
        throw new Error("Could not get cloudfront domain name");
      }

      const routeData: ChangeResourceRecordSetsResponse = await new Promise(
        (resolve, reject) =>
          route53.changeResourceRecordSets(
            {
              ChangeBatch: {
                Changes: ["A", "AAAA"].map((Type) => ({
                  Action: "CREATE",
                  ResourceRecordSet: {
                    AliasTarget: {
                      DNSName: cloudFrontDomainName,
                      EvaluateTargetHealth: false,
                      // TODO: auto-get
                      HostedZoneId: aliasHostedZoneId,
                    },
                    Name: alias,
                    Type,
                  },
                })),
                Comment: "",
              },
              HostedZoneId: hostedZoneId,
            },
            (error, data) => {
              if (error) reject(error);
              resolve(data);
            }
          )
      );

      console.log("distributionResult");
      console.log(distributionResult);

      console.log("routeData");
      console.log(routeData);
    }

    let comment;
    const commentBody = `
### Deploy 🚀

| Key | Value |
| --- | --- |
| **URL** | https://${alias} |
| Time | ${new Date().toISOString()} |`;
    if (previousDeployComment) {
      comment = await octokit.issues.updateComment({
        comment_id: previousDeployComment.id,
        ...github.context.issue,
        body: commentBody,
      });
    } else {
      comment = await octokit.issues
        .createComment({
          ...github.context.issue,
          issue_number: github.context.issue.number,
          body: commentBody,
        })
        .catch(() => undefined);
    }

    console.log("comment");
    console.log(comment);
  } catch (error) {
    core.setFailed(`Deploy-action failure: ${error}`);
  }
}

run();

export default run;
