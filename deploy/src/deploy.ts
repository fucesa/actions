// import * as childProcess from "child_process";
// import * as path from "path";

import * as core from "@actions/core";
import * as AWS from "aws-sdk";

const cloudfront = new AWS.CloudFront();

async function run(): Promise<void> {
  try {
    const namespace = core.getInput("namespace")?.trim() ?? "";
    const bucket = core.getInput("bucket")?.trim() ?? "";

    console.log("Bucket:", bucket);
    console.log("Namespace:", namespace);

    const data = await new Promise((resolve, reject) =>
      cloudfront.createDistributionWithTags(
        {
          DistributionConfigWithTags: {
            /* required */
            DistributionConfig: {
              /* required */ CallerReference: "STRING_VALUE" /* required */,
              Comment: "STRING_VALUE" /* required */,
              DefaultCacheBehavior: {
                TargetOriginId: namespace /* required */,
                ViewerProtocolPolicy: "https-only" /* required */,
                AllowedMethods: {
                  Items: ["HEAD", "GET"],
                  Quantity: 2,
                  CachedMethods: {
                    Items: ["HEAD", "GET"],
                    Quantity: 2,
                  },
                },
                //   CachePolicyId: 'STRING_VALUE',
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
                    DomainName: `${bucket}.s3.amazon.com` /* required */,
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
                      OriginAccessIdentity:
                        // TODO:
                        "origin-access-identity/cloudfront/EJEUEVSC0QZ70" /* required */,
                    },
                  },
                  /* more items */
                ],
              },
              Aliases: {
                Quantity: 1 /* required */,
                Items: [`${namespace}.teia.dev`],
              },
              // },
              CacheBehaviors: {
                Quantity: 0,
              },
              CustomErrorResponses: {
                Quantity: 2,
                Items: [
                  {
                    ErrorCode: 404,
                    ErrorCachingMinTTL: 300,
                    ResponseCode: "200",
                    ResponsePagePath: "/index.html",
                  },
                  {
                    ErrorCode: 403,
                    ErrorCachingMinTTL: 300,
                    ResponseCode: "200",
                    ResponsePagePath: "/index.html",
                  },
                ],
              },
              DefaultRootObject: "STRING_VALUE",
              HttpVersion: "HTTP2",
              IsIPV6Enabled: true,
              // Logging: {
              //   Bucket: 'STRING_VALUE', /* required */
              //   Enabled: true || false, /* required */
              //   IncludeCookies: true || false, /* required */
              //   Prefix: 'STRING_VALUE' /* required */
              // },
              OriginGroups: {
                Quantity: 0, //required
              },
              //   Items: [
              //     {
              //       FailoverCriteria: { /* required */
              //         StatusCodes: { /* required */
              //           Items: [ /* required */
              //             'NUMBER_VALUE',
              //             /* more items */
              //           ],
              //           Quantity: 'NUMBER_VALUE' /* required */
              //         }
              //       },
              //       Id: 'STRING_VALUE', /* required */
              //       Members: { /* required */
              //         Items: [ /* required */
              //           {
              //             OriginId: 'STRING_VALUE' /* required */
              //           },
              //           /* more items */
              //         ],
              //         Quantity: 'NUMBER_VALUE' /* required */
              //       }
              //     },
              //     /* more items */
              //   ]
              // },
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
                {
                  Key: "DEPLOY_TYPE",
                  Value: "PREVIEW",
                },
                {
                  Key: "NAMESPACE",
                  Value: namespace,
                },
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

    console.log(data);
  } catch (error) {
    core.setFailed(`Deploy-action failure: ${error}`);
  }
}

run();

export default run;
