import * as core from "@actions/core";
import { CloudFront } from "aws-sdk";

const cloudfront = new CloudFront();

async function run(): Promise<void> {
  try {
    const namespace = core.getInput("namespace")?.trim() ?? "";
    const bucket = core.getInput("bucket")?.trim() ?? "";
    const domainName = core.getInput("domainName")?.trim() ?? "";
    const originAccessIdentity =
      core.getInput("originAccessIdentity")?.trim() ?? "";

    console.log("Bucket:", bucket);
    console.log("Namespace:", namespace);
    console.log("Origin Access Identity:", originAccessIdentity);

    // TODO: check if distribution already exists

    const data = await new Promise((resolve, reject) =>
      cloudfront.createDistributionWithTags(
        {
          DistributionConfigWithTags: {
            /* required */
            DistributionConfig: {
              CallerReference: "STRING_VALUE" /* required */,
              Comment: "",
              DefaultCacheBehavior: {
                TargetOriginId: namespace,
                ViewerProtocolPolicy: "https-only",
                AllowedMethods: {
                  Items: ["HEAD", "GET"],
                  Quantity: 2,
                  CachedMethods: {
                    Items: ["HEAD", "GET"],
                    Quantity: 2,
                  },
                },
                CachePolicyId: "658327ea-f89d-4fab-a63d-7e88639e58f6",
                Compress: true,
                //   DefaultTTL: 'NUMBER_VALUE',
                FieldLevelEncryptionId: "",
                //   ForwardedValues: {
                //     Cookies: { /* required */
                //       Forward: none | whitelist | all, /* required */
                //       WhitelistedNames: {
                //         Quantity: 'NUMBER_VALUE', /* required */
                //         Items: [
                //           'STRING_VALUE',
                //           /* more items */
                //         ]
                //       }
                //     },
                //     QueryString: true || false, /* required */
                //     Headers: {
                //       Quantity: 'NUMBER_VALUE', /* required */
                //       Items: [
                //         'STRING_VALUE',
                //         /* more items */
                //       ]
                //     },
                //     QueryStringCacheKeys: {
                //       Quantity: 'NUMBER_VALUE', /* required */
                //       Items: [
                //         'STRING_VALUE',
                //         /* more items */
                //       ]
                //     }
                //   },
                LambdaFunctionAssociations: { Quantity: 0 },
                //   MaxTTL: 'NUMBER_VALUE',
                //   MinTTL: 'NUMBER_VALUE',
                //   OriginRequestPolicyId: 'STRING_VALUE',
                //   RealtimeLogConfigArn: 'STRING_VALUE',
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
              Enabled: true /* required */,
              Origins: {
                /* required */
                Quantity: 1 /* required */,
                Items: [
                  {
                    DomainName: `${bucket}.s3.amazonaws.com` /* required */,
                    Id: namespace, // required
                    ConnectionAttempts: 3,
                    ConnectionTimeout: 10,
                    CustomHeaders: {
                      Quantity: 0 /* required */,
                      // Items: [
                      //   {
                      //     HeaderName: "STRING_VALUE" /* required */,
                      //     HeaderValue: "STRING_VALUE" /* required */,
                      //   },
                      //   /* more items */
                      // ],
                    },
                    // CustomOriginConfig: {
                    //   HTTPPort: "NUMBER_VALUE" /* required */,
                    //   HTTPSPort: "NUMBER_VALUE" /* required */,
                    //   OriginProtocolPolicy: "https-only" /* required */,
                    // //   OriginKeepaliveTimeout: "NUMBER_VALUE",
                    // //   OriginReadTimeout: "NUMBER_VALUE",
                    //   // OriginSslProtocols: {
                    //   //   Items: [ /* required */
                    //   //     SSLv3 | TLSv1 | TLSv1.1 | TLSv1.2,
                    //   //     /* more items */
                    //   //   ],
                    //   //   Quantity: 'NUMBER_VALUE' /* required */
                    //   // }
                    // },
                    OriginPath: `/${namespace}`,
                    OriginShield: {
                      Enabled: false /* required */,
                    },
                    S3OriginConfig: {
                      OriginAccessIdentity: originAccessIdentity /* required */,
                    },
                  },
                ],
              },
              Aliases: {
                Quantity: 1,
                Items: [`${namespace}.${domainName}`],
              },
              CacheBehaviors: {
                Quantity: 0,
              },
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
              OriginGroups: {
                Quantity: 0, //required
              },
              PriceClass: "PriceClass_All",
              // Restrictions: {
              //   GeoRestriction: { /* required */
              //     Quantity: 'NUMBER_VALUE', /* required */
              //     RestrictionType: blacklist | whitelist | none, /* required */
              //     Items: [
              //       'STRING_VALUE',
              //       /* more items */
              //     ]
              //   }
              // },
              // ViewerCertificate: {
              //   ACMCertificateArn: 'STRING_VALUE',
              //   Certificate: 'STRING_VALUE',
              //   CertificateSource: cloudfront | iam | acm,
              //   CloudFrontDefaultCertificate: false,
              //   IAMCertificateId: '4f32e5ba-82b6-4c34-9ec2-ac1cf23d0dd3',
              //   MinimumProtocolVersion: SSLv3 | TLSv1 | TLSv1_2016 | TLSv1.1_2016 | TLSv1.2_2018 | TLSv1.2_2019,
              //   SSLSupportMethod: sni-only | vip | static-ip
              // },
              WebACLId: "",
            },
            Tags: {
              Items: [
                { Key: "DEPLOY_TYPE", Value: "PREVIEW" },
                { Key: "NAMESPACE", Value: namespace },
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

    // TODO: Create Route53 Record

    console.log(data);
  } catch (error) {
    core.setFailed(`Deploy-action failure: ${error}`);
  }
}

run();

export default run;
