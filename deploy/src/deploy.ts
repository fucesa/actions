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
                // required
                TargetOriginId: "STRING_VALUE" /* required */,
                ViewerProtocolPolicy: "https-only" /* required */,
                //   AllowedMethods: {
                //     Items: [ /* required */
                //       GET | HEAD | POST | PUT | PATCH | OPTIONS | DELETE,
                //       /* more items */
                //     ],
                //     Quantity: 'NUMBER_VALUE', /* required */
                //     CachedMethods: {
                //       Items: [ /* required */
                //         GET | HEAD | POST | PUT | PATCH | OPTIONS | DELETE,
                //         /* more items */
                //       ],
                //       Quantity: 'NUMBER_VALUE' /* required */
                //     }
                //   },
                //   CachePolicyId: 'STRING_VALUE',
                Compress: true,
                //   DefaultTTL: 'NUMBER_VALUE',
                //   FieldLevelEncryptionId: 'STRING_VALUE',
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
                //   LambdaFunctionAssociations: {
                //     Quantity: 'NUMBER_VALUE', /* required */
                //     Items: [
                //       {
                //         EventType: viewer-request | viewer-response | origin-request | origin-response, /* required */
                //         LambdaFunctionARN: 'STRING_VALUE', /* required */
                //         IncludeBody: true || false
                //       },
                //       /* more items */
                //     ]
                //   },
                //   MaxTTL: 'NUMBER_VALUE',
                //   MinTTL: 'NUMBER_VALUE',
                //   OriginRequestPolicyId: 'STRING_VALUE',
                //   RealtimeLogConfigArn: 'STRING_VALUE',
                //   SmoothStreaming: true || false,
                //   TrustedKeyGroups: {
                //     Enabled: true || false, /* required */
                //     Quantity: 'NUMBER_VALUE', /* required */
                //     Items: [
                //       'STRING_VALUE',
                //       /* more items */
                //     ]
                //   },
                //   TrustedSigners: {
                //     Enabled: true || false, /* required */
                //     Quantity: 'NUMBER_VALUE', /* required */
                //     Items: [
                //       'STRING_VALUE',
                //       /* more items */
                //     ]
                //   }
              },
              Enabled: true /* required */,
              Origins: {
                /* required */
                Quantity: 1 /* required */,
                Items: [
                  {
                    DomainName: `${bucket}.s3.amazon.com` /* required */,
                    Id: namespace, // required
                    // ConnectionAttempts: "NUMBER_VALUE",
                    // ConnectionTimeout: "NUMBER_VALUE",
                    // CustomHeaders: {
                    //   Quantity: "NUMBER_VALUE" /* required */,
                    //   Items: [
                    //     {
                    //       HeaderName: "STRING_VALUE" /* required */,
                    //       HeaderValue: "STRING_VALUE" /* required */,
                    //     },
                    //     /* more items */
                    //   ],
                    // },
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
                    // OriginShield: {
                    //   Enabled: true || false /* required */,
                    //   OriginShieldRegion: "STRING_VALUE",
                    // },
                    S3OriginConfig: {
                      OriginAccessIdentity:
                        "access-identity-default" /* required */,
                    },
                  },
                  /* more items */
                ],
              },
              // Aliases: {
              //   Quantity: "NUMBER_VALUE" /* required */,
              //   Items: [
              //     "STRING_VALUE",
              //     /* more items */
              //   ],
              // },
              // CacheBehaviors: {
              //   Quantity: 'NUMBER_VALUE', /* required */
              //   Items: [
              //     {
              //       PathPattern: 'STRING_VALUE', /* required */
              //       TargetOriginId: 'STRING_VALUE', /* required */
              //       ViewerProtocolPolicy: allow-all | https-only | redirect-to-https, /* required */
              //       AllowedMethods: {
              //         Items: [ /* required */
              //           GET | HEAD | POST | PUT | PATCH | OPTIONS | DELETE,
              //           /* more items */
              //         ],
              //         Quantity: 'NUMBER_VALUE', /* required */
              //         CachedMethods: {
              //           Items: [ /* required */
              //             GET | HEAD | POST | PUT | PATCH | OPTIONS | DELETE,
              //             /* more items */
              //           ],
              //           Quantity: 'NUMBER_VALUE' /* required */
              //         }
              //       },
              //       CachePolicyId: 'STRING_VALUE',
              //       Compress: true || false,
              //       DefaultTTL: 'NUMBER_VALUE',
              //       FieldLevelEncryptionId: 'STRING_VALUE',
              //       ForwardedValues: {
              //         Cookies: { /* required */
              //           Forward: none | whitelist | all, /* required */
              //           WhitelistedNames: {
              //             Quantity: 'NUMBER_VALUE', /* required */
              //             Items: [
              //               'STRING_VALUE',
              //               /* more items */
              //             ]
              //           }
              //         },
              //         QueryString: true || false, /* required */
              //         Headers: {
              //           Quantity: 'NUMBER_VALUE', /* required */
              //           Items: [
              //             'STRING_VALUE',
              //             /* more items */
              //           ]
              //         },
              //         QueryStringCacheKeys: {
              //           Quantity: 'NUMBER_VALUE', /* required */
              //           Items: [
              //             'STRING_VALUE',
              //             /* more items */
              //           ]
              //         }
              //       },
              //       LambdaFunctionAssociations: {
              //         Quantity: 'NUMBER_VALUE', /* required */
              //         Items: [
              //           {
              //             EventType: viewer-request | viewer-response | origin-request | origin-response, /* required */
              //             LambdaFunctionARN: 'STRING_VALUE', /* required */
              //             IncludeBody: true || false
              //           },
              //           /* more items */
              //         ]
              //       },
              //       MaxTTL: 'NUMBER_VALUE',
              //       MinTTL: 'NUMBER_VALUE',
              //       OriginRequestPolicyId: 'STRING_VALUE',
              //       RealtimeLogConfigArn: 'STRING_VALUE',
              //       SmoothStreaming: true || false,
              //       TrustedKeyGroups: {
              //         Enabled: true || false, /* required */
              //         Quantity: 'NUMBER_VALUE', /* required */
              //         Items: [
              //           'STRING_VALUE',
              //           /* more items */
              //         ]
              //       },
              //       TrustedSigners: {
              //         Enabled: true || false, /* required */
              //         Quantity: 'NUMBER_VALUE', /* required */
              //         Items: [
              //           'STRING_VALUE',
              //           /* more items */
              //         ]
              //       }
              //     },
              //     /* more items */
              //   ]
              // },
              CustomErrorResponses: {
                Quantity: 1 /* required */,
                Items: [
                  {
                    ErrorCode: 404 /* required */,
                    //   ErrorCachingMinTTL: 'NUMBER_VALUE',
                    ResponseCode: "200",
                    ResponsePagePath: "/index.html",
                  },
                  /* more items */
                ],
              },
              DefaultRootObject: "STRING_VALUE",
              HttpVersion: "http2",
              IsIPV6Enabled: true,
              // Logging: {
              //   Bucket: 'STRING_VALUE', /* required */
              //   Enabled: true || false, /* required */
              //   IncludeCookies: true || false, /* required */
              //   Prefix: 'STRING_VALUE' /* required */
              // },
              // OriginGroups: {
              //   Quantity: 'NUMBER_VALUE', /* required */
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
              // PriceClass: PriceClass_100 | PriceClass_200 | PriceClass_All,
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
              //   CloudFrontDefaultCertificate: true || false,
              //   IAMCertificateId: 'STRING_VALUE',
              //   MinimumProtocolVersion: SSLv3 | TLSv1 | TLSv1_2016 | TLSv1.1_2016 | TLSv1.2_2018 | TLSv1.2_2019,
              //   SSLSupportMethod: sni-only | vip | static-ip
              // },
              // WebACLId: 'STRING_VALUE'
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
