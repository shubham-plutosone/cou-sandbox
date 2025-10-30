import { ContentSection, ContentSubSection } from "./ContentSection";
import { JsonBlock} from "./JsonBlock";
import apiFlowImg from "@/assets/api-flow.png";

export const DocContent = () => {
  return (
    <div className="space-y-15">
      {/* VERSION */}
      <ContentSection id="version" title="VERSION">
        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed">
            This documentation covers all versions of the AI (Agent Institution) API for BBPS COU integration.
          </p>
        </div>
      </ContentSection>

      <ContentSection id="v-1-0" title="Version 1.0">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
          <p className="text-gray-800">We have introduced an agent API kit with fetch & pay feature.</p>
        </div>
      </ContentSection>

      <ContentSection id="v-1-1" title="Version 1.1">
        <div className="space-y-4">
          <p className="text-gray-700">
            This is our second version of the AI (Agent Institution) API. It includes the initial set of features for bill management and complaint handling.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Bill fetching and payment processing</li>
              <li>Bill validation and status-checking</li>
              <li>Complaint management system</li>
              <li>Plan and Biller Master Data Management (MDM)</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="v-1-2" title="Version 1.2">
        <div className="space-y-4">
          <p className="text-gray-700">
            This version introduces significant improvements and new features to enhance the API's functionality and performance.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Key Updates:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li><strong>Complaint Disposition API:</strong> Added a new API endpoint for complaint disposition</li>
              <li><strong>Enhanced API Responses:</strong> Improved response structures across multiple endpoints</li>
              <li><strong>Improved Payload Structure:</strong> Refined payload designs for better data organization</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="v-1-3" title="Version 1.3">
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Key Updates:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Complaint Raise & Status API according to Harmonization TAT documentation</li>
              <li>Implementation of Remitter Details for amounts above ₹50,000 for all categories</li>
              <li>Implementation of Credit Card Category</li>
              <li>The <code className="bg-gray-200 px-2 py-1 rounded text-sm">paymentRefId</code> field is now mandatory</li>
              <li>Payment Account Info key required in paymentInformation section</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="v-1-4" title="Version 1.4">
        <br />
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3">Key Updates:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Changes in bill fetch response and payment request for handling multiple amounts</li>
              <li>API for tracking LPG gas booking status with detailed information</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* API Flow Diagram */}
      <ContentSection id="api-flow-diagram" title="API Flow Diagram">
        <br />
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
          <div className="mt-6 flex justify-center">
            <img
              src={apiFlowImg}
              alt="API Flow Diagram"
              className="rounded-lg shadow-md max-w-full h-auto border border-gray-200"
            />
          </div>
        </div>
      </ContentSection>

      {/* Authentication */}
      <ContentSection id="authentication" title="Authentication">
        <br />
        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="font-semibold text-gray-900">All APIs require a Bearer Token in the header.</p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Generate Token</h3>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-400 mb-2">Endpoint</p>
              <code className="text-green-400">POST /v1/auth/token</code>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">scopes:</h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700 font-mono">
                  read_bills, read_plans, read_packs, get_bill_mob, get_bill_int, get_bill_agt, pay_bill_int, 
                  pay_bill_mob, pay_bill_agt, read_billers, read_regions, read_circles, bill_validate, 
                  read_operators, raise_complaint, get_biller_plans, read_transactions, get_biller_status, 
                  register_complain, read_agent_balance, create_transactions, get_biller_by_region, 
                  read_operator_circle, check_complain_status, get_biller_categories, get_biller_by_category, 
                  check_complaint_status, read_biller_categories,bill_payment_validation, 
                  get_bill_payment_txn_status, check_balance
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Request Payload:</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border text-left">Field</th>
                      <th className="px-4 py-2 border text-left">Type</th>
                      <th className="px-4 py-2 border text-left">Description</th>
                      <th className="px-4 py-2 border text-left">Mandatory (M) | Optional (O)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border">clientKey</td>
                      <td className="px-4 py-2 border">String</td>
                      <td className="px-4 py-2 border">client Key</td>
                      <td className="px-4 py-2 border">M</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">clientScrete</td>
                      <td className="px-4 py-2 border">String</td>
                      <td className="px-4 py-2 border">client Secret</td>
                      <td className="px-4 py-2 border">M</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 border">scopes</td>
                      <td className="px-4 py-2 border">String</td>
                      <td className="px-4 py-2 border">Scope should be in String format
 & separated by space eg.
 read_bills read_plans read_packs</td>
                      <td className="px-4 py-2 border">M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">Header :</h4>
              <div>
              <h4 className="font-semibold text-gray-900 mb-3">Request Payload:</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-300">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 border text-left">Field</th>
                      <th className="px-4 py-2 border text-left">Value</th>
                      <th className="px-4 py-2 border text-left">Mandatory (M) | Optional (O)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="px-4 py-2 border">Authorization</td>
                      <td className="px-4 py-2 border">Bearer &lt;TOKEN&gt;</td>
                      <td className="px-4 py-2 border">M</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* API LISTING */}
      <ContentSection id="api-listing" title="API LISTING">
        <br />
        <p className="text-gray-700 text-lg">
          Complete reference for all available API endpoints in the BBPS COU system.
        </p>
      </ContentSection>

      {/* 1. Get all biller categories */}
      <ContentSubSection id="get-all-biller-categories" title="1. Get All Biller Categories">
        <br />
        <div className="space-y-6">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Endpoint</p>
            <code className="text-green-400">GET /api/v1/billers/categories/all</code>
          </div>

          <p className="text-gray-700">
            This API allows the retrieval of all biller categories available in the BBPS system.
          </p>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Query Parameters:</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border text-left">Field</th>
                    <th className="px-4 py-2 border text-left">Type</th>
                    <th className="px-4 py-2 border text-left">Description</th>
                    <th className="px-4 py-2 border text-left">Required</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border">page</td>
                    <td className="px-4 py-2 border">Number</td>
                    <td className="px-4 py-2 border">Page number</td>
                    <td className="px-4 py-2 border">Optional</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">limit</td>
                    <td className="px-4 py-2 border">Number</td>
                    <td className="px-4 py-2 border">Number of items per page</td>
                    <td className="px-4 py-2 border">Optional</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border">search</td>
                    <td className="px-4 py-2 border">String</td>
                    <td className="px-4 py-2 border">Search biller categories</td>
                    <td className="px-4 py-2 border">Optional</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Response:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  200 OK
                </span>
                : Regions fetched successfully.
              </li>
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  401 Unauthorized
                </span>
                : Unauthorized.
              </li>
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  500 Internal Server Error
                </span>
                : An error occurred on the server.
              </li>
            </ul>
          </div>

          <JsonBlock
            title="Response Example"
            data={{
              "code": 200,
              "status": "SUCCESS",
              "payload": {
                "returnItems": 1,
                "categories": ["DTH", "Electricity", "Water", "Gas"]
              }
            }}
          />
        </div>
      </ContentSubSection>

      {/* Get Billers By Category */}
      <ContentSubSection id="get-billers-by-category" title="2. Get Billers by Category">
        <br />
        <div className="space-y-6">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Endpoint</p>
            <code className="text-green-400">GET /api/v1/billers/category/{`{categoryName}`}</code>
          </div>

          <p className="text-gray-700">
            Retrieves all billers of a specific category available in the BBPS system.
          </p>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Response:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  200 OK
                </span>
                : Regions fetched successfully.
              </li>
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  401 Unauthorized
                </span>
                : Unauthorized.
              </li>
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  500 Internal Server Error
                </span>
                : An error occurred on the server.
              </li>
            </ul>
          </div>

          <JsonBlock
            title="Response Example"
            data={
              {
                "code": 200,
                "status": "SUCCESS",
                "payload": {
                "data": [
                {
                "billerId": "OANSTOP00NAT01",
                "billerName": "OANS",
                "billerAliasName": "VAL2 Alias",
                "billerCategoryName": "DTH",
                "billerMode": "OFFLINEA",
                "billerAcceptsAdhoc": "false",
                "parentBiller": "false",
                "fetchRequirement": "NOT_SUPPORTED",
                "billerOwnerShp": "Private",
                "paymentAmountExactness": "Exact",
                "supportBillValidation": "OPTIONAL",
                "billerEffctvFrom": "20160708T000000.000Z",
                "billerEffctvTo": "20220518T000000.000Z",
                "billerTempDeactivationStart": "",
                "billerTempDeactivationEnd": "",
                "billerDescription": "",
                "planMdmRequirement": "NOT_SUPPORTED",
                "Status": "ACTIVE",
                "supportDeemed": "NA",
                "supportPendingStatus": "NA",
                "billerTimeOut": "120",
                "billerCoverage": "IND",
                "billerPaymentModes": [
                {
                "paymentMode": "Internet Banking",
                "minLimit": "1",
                "maxLimit": "500000000",
                "supportPendingStatus": "Yes"
                },
                {
                "paymentMode": "Debit Card",
                "minLimit": "1",
                "maxLimit": "500000000",
                "supportPendingStatus": "Yes"
                },
                {
                "paymentMode": "Credit Card",
                "minLimit": "1",
                "maxLimit": "500000000",
                "supportPendingStatus": "Yes"
                },
                {
                "paymentMode": "Prepaid Card",
                "minLimit": "1",
                "maxLimit": "500000000",
                "supportPendingStatus": "Yes"
                },
                {
                "paymentMode": "IMPS",
                "minLimit": "1",
                "maxLimit": "500000000",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentMode": "Cash",
                                      "minLimit": "1",
                                      "maxLimit": "500000000",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentMode": "UPI",
                                      "minLimit": "1",
                                      "maxLimit": "500000000",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentMode": "Wallet",
                                      "minLimit": "1",
                                      "maxLimit": "500000000",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentMode": "NEFT",
                                      "minLimit": "1",
                                      "maxLimit": "500000000",
                                      "supportPendingStatus": "Yes"
                                  }
                              ],
                              "billerPaymentChannels": [
                                  {
                                      "paymentChannel": "INT",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentChannel": "INTB",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentChannel": "MOB",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentChannel": "MOBB",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentChannel": "POS",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentChannel": "MPOS",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentChannel": "ATM",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentChannel": "BNKBRNCH",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentChannel": "KIOSK",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentChannel": "AGT",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  },
                                  {
                                      "paymentChannel": "BSC",
                                      "maxLimit": "20000000",
                                      "minLimit": "1",
                                      "supportPendingStatus": "Yes"
                                  }
                              ],
                              "billerCustomerParams": [
                                  {
                                      "paramName": "a",
                                      "dataType": "NUMERIC",
                                      "optional": "false",
                                      "minLength": "1",
                                      "maxLength": "3",
                                      "regex": "AZa-z09\@\s\8,35",
                                      "values": "",
                                      "visibility": "true"
                                  },
                                  {
                                      "paramName": "a b",
                                      "dataType": "NUMERIC",
                                      "optional": "false",
                                      "minLength": "1",
                                      "maxLength": "3",
                                      "regex": "AZa-z09\@\s\8,35",
                                      "values": "",
                                      "visibility": "true"
                                  },
                                  {
                                      "paramName": "a b c",
                                      "dataType": "NUMERIC",
                                      "optional": "false",
                                      "minLength": "1",
                                      "maxLength": "3",
                                      "regex": "AZa-z09\@\s\8,35",
                                      "values": "",
                                      "visibility": "true"
                                  },
                                  {
                                      "paramName": "a b c d",
                                      "dataType": "NUMERIC",
                                      "optional": "false",
                                      "minLength": "1",
                                      "maxLength": "3",
                                      "regex": "AZa-z09\@\s\8,35",
                                      "values": "",
                                      "visibility": "true"
                                  },
                                  {
                                      "paramName": "a b c d e",
                                      "dataType": "NUMERIC",
                                      "optional": "false",
                                      "minLength": "1",
                                      "maxLength": "3",
                                      "regex": "AZa-z09\@\s\8,35",
                                      "values": "",
                                      "visibility": "true"
                                  }
                              ],
                              "billerResponseParams": {
                                  "amountOptions": {
                                      "amountbreakupset": "BASE_BILL_AMOUNT"
                                  }
                              },
                              "customerParamGroups": {},
                              "billerAdditionalInfo": [],
                              "billerAdditionalInfoPayment": [],
                              "interchangeFeeConf": [
                                  {
                                        "mti": "PAYMENT",
                                            "responseCode": "000",
                                            "paymentMode": "",
                                            "paymentChannel": "",
                                            "fees": [
                                                "CCF1",
                                                "EBF"
                                            ],
                                            "defaultFee": "true",
                                            "effctvFrom": "20190801",
                                            "effctvTo": ""
                                  },
                                  {
                                        "mti": "PAYMENT",
                                            "responseCode": "000",
                                            "paymentMode": "",
                                            "paymentChannel": "",
                                            "fees": [
                                                "CCF1",
                                                "EBF"
                                            ],
                                            "defaultFee": "true",
                                            "effctvFrom": "20190801",
                                            "effctvTo": ""
                                  },
                                  {
                                          "mti": "PAYMENT",
                                            "responseCode": "000",
                                            "paymentMode": "",
                                            "paymentChannel": "",
                                            "fees": [
                                                "CCF1",
                                                "EBF"
                                            ],
                                            "defaultFee": "true",
                                            "effctvFrom": "20190801",
                                            "effctvTo": ""
                                  },
                                  {
                                          "mti": "PAYMENT",
                                            "responseCode": "000",
                                            "paymentMode": "",
                                            "paymentChannel": "",
                                            "fees": [
                                                "CCF1",
                                                "EBF"
                                            ],
                                            "defaultFee": "true",
                                            "effctvFrom": "20190801",
                                            "effctvTo": ""
                                  }
                              ],
                              "interchangeFee": [
                                {
                                          "feeCode": "CCF1",
                                          "feeDesc": "Customer_Convenience_Fee",
                                          "feeDirection": "C2B",
                                          "interchangeFeeDetails":[
                                            {
                                          "tranAmtRangeMax":"9223372036854775807",
                                          "tranAmtRangeMin":"0",
                                          "percentFee": "0.00",
                                          "flatFee":"0",
                                          "effctvFrom":"20180925",
                                          "effctvTo": ""
                                            }
                                          ]
                                      },
                                      {
                                          "feeCode": "PBF",
                                          "feeDesc": "Physical_Biller_Fee",
                                          "feeDirection": "B2C",
                                          "interchangeFeeDetails":[
                                            {
                                          "tranAmtRangeMax":"9223372036854775807",
                                          "tranAmtRangeMin":"0",
                                          "percentFee": "0.00",
                                          "flatFee":"0",
                                          "effctvFrom":"20180925",
                                          "effctvTo": ""
                                            }
                                          ]
                                      },
                                      {
                                          "feeCode": "EBF",
                                          "feeDesc": "Electronic_Biller_Fee",
                                          "feeDirection": "B2C",
                                          "interchangeFeeDetails":[
                                            {
                                          "tranAmtRangeMax":"9223372036854775807",
                                          "tranAmtRangeMin":"0",
                                          "percentFee": "0.00",
                                          "flatFee":"0",
                                          "effctvFrom":"20180925",
                                          "effctvTo": ""
                                            }
                                          ]
                                      }
                              ],
                              "planAdditionalInfo": []
                          },
                      ]
                  }
            }
          }
          />
        </div>
      </ContentSubSection>

      {/* Get all biller regions */}
      <ContentSubSection id="get-all-biller-regions" title="3. Get all biller regions">
        <br />
        <div className="space-y-6">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Endpoint</p>
            <code className="text-green-400">GET /api/v1/billers/regions/all</code>
          </div>

          <p className="text-gray-700">
            This API allows to retrieves all biller regions available in the COU system.
          </p>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Response:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  200 OK
                </span>
                : Regions fetched successfully.
              </li>
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  401 Unauthorized
                </span>
                : Unauthorized.
              </li>
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  500 Internal Server Error
                </span>
                : An error occurred on the server.
              </li>
            </ul>
          </div>

          
        </div>
      </ContentSubSection>

      {/* Get billers by region */}
      <ContentSubSection id="get-billers-by-region" title="2. Get billers by region">
        <br />
        <div className="space-y-6">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Endpoint</p>
            <code className="text-green-400">GET /api/v1/billers/region/{`{region}`}</code>
          </div>

          <p className="text-gray-700">
            This API allows to retrieves all billers available in the COU system by region.
          </p>

          <div className="mt-6">
            <h4 className="font-semibold text-gray-900 mb-3">Response:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-800">
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  200 OK
                </span>
                : Regions fetched successfully.
              </li>
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  401 Unauthorized
                </span>
                : Unauthorized.
              </li>
              <li>
                <span className="bg-red-50 text-red-600 font-mono px-2 py-0.5 rounded text-sm border border-red-200">
                  500 Internal Server Error
                </span>
                : An error occurred on the server.
              </li>
            </ul>
          </div>


          <JsonBlock
            title="Response Example"
            data={{
        "code": 200,
        "status": "SUCCESS",
        "payload": {
            "data": [
                {
                    "billerId": "ADAR00000NAT97",
                    "billerName": "Adarsh Shikshan Sewa Trust Aburoad",
                    "billerAliasName": "Adarsh Shikshan Sewa Trust Aburoad",
                    "billerCategoryName": "Education Fees",
                    "billerMode": "OFFLINEA",
                    "billerAcceptsAdhoc": "false",
                    "parentBiller": "false",
                    "billerOwnerShp": "Private",
                    "billerCoverage": "IND",
                    "fetchRequirement": "MANDATORY",
                    "paymentAmountExactness": "Exact and above",
                    "supportBillValidation": "NOT_SUPPORTED",
                    "billerEffctvFrom": "2022-11-25T00:00:00.000Z",
                    "billerEffctvTo": "2032-11-30T00:00:00.000Z",
                    "billerTempDeactivationStart": "",
                    "billerTempDeactivationEnd": "",
                    "Status": "ACTIVE",
                    "planMdmRequirement": "NOT_SUPPORTED",
                    "billerResponseType": "SINGLE",
                    "upmsEnabled": false,
                    "clickpayEnabled": true,
                    "clickpayValue": "L3PL",
                    "supportsCalendarDayFetchRetention": false,
                    "deemedSuccessEnabled": false,
                    "valAddFlag": false,
                    "fetchRetentionInHours": "",
                    "corporateFlag": false,
                    "billAdjustmentFrequency": "None",
                    "mandateRequirement": "NOT_SUPPORTED",
                    "blrReqResFormat": "XML",
                    "pseudoBiller": false,
                    "supportCallBack": false,
                    "supportDeemed": "Yes",
                    "supportPendingStatus": "No",
                    "billerPaymentModes": [
                        {
                            "paymentMode": "Internet Banking",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentMode": "Debit Card",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentMode": "Credit Card",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentMode": "Prepaid Card",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentMode": "IMPS",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentMode": "Cash",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentMode": "UPI",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentMode": "Wallet",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentMode": "NEFT",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentMode": "AEPS",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentMode": "Account Transfer",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        }
                    ],
                    "billerPaymentChannels": [
                        {
                            "paymentChannel": "INT",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentChannel": "INTB",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentChannel": "MOB",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentChannel": "MOBB",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentChannel": "POS",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentChannel": "MPOS",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentChannel": "ATM",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentChannel": "BNKBRNCH",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentChannel": "KIOSK",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentChannel": "AGT",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        },
                        {
                            "paymentChannel": "BSC",
                            "maxLimit": "10000000",
                            "minLimit": "100"
                        }
                    ],
                    "billerCustomerParams": [
                        {
                            "paramName": "Student Serial No",
                            "dataType": "ALPHANUMERIC",
                            "optional": "false",
                            "minLength": "1",
                            "maxLength": "20",
                            "regex": "^[a-zA-Z0-9,()/._''-]{1,20}$",
                            "visibility": "true",
                            "encryptionType": "NONE"
                        }
                    ],
                    "customerParamGroups": "",
                    "billerResponseParams": {
                        "amountOptions": {
                            "amountBreakupSet": "BASE_BILL_AMOUNT"
                        }
                    },
                    "billerAdditionalInfo": [
                        {
                            "paramName": "Class",
                            "dataType": "ALPHANUMERIC",
                            "optional": "false"
                        }
                    ],
                    "billerAdditionalInfoPayment": [],
                    "interchangeFeeConf": [],
                    "interchangeFee": [],
                    "planAdditionalInfo": []
                },]
              }
            }
          }
          />
        </div>
      </ContentSubSection>
      

      {/* Add more sections as needed - this is a template structure */}
      <ContentSection id="bill-fetch" title="8. Bill Fetch">
        <br />
        <div className="space-y-6">
          <p className="text-gray-700 text-lg">
            Bill fetch APIs allow you to retrieve detailed information about a specific bill using required parameters.
          </p>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <p className="font-semibold text-gray-900 mb-2">Important:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Bill fetch is required based on the biller's <code className="bg-yellow-100 px-2 py-1 rounded">fetchRequirement</code> parameter</li>
              <li>Possible values: MANDATORY, OPTIONAL, NOT_SUPPORTED</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="bill-fetch-int" title="a) INT (Internet)">
        <br />
        <div className="space-y-6">
          <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-400 mb-2">Endpoint</p>
            <code className="text-green-400">POST /api/v1/bill/fetch/int</code>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Request Payload:</h4>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
    {`{
    "refId": "PLUTOSETCW1ZX128BBV9KYSASC643031647",
    "customerDetails": {
        "EMAIL": "john.doe@me.com",
        "REMITTER NAME": "Shikha"
    },
    "customerMobileNumber": "9651137248",
    "agentId": "IPAYUAT2022101363258",
    "billerId": "ECHA00000NATDO",
    "deviceDetails": {
        "MAC": "54E1AD27FEE3",
        "IP": "45.118.159.37"
    },
    "customerParams": {
        "Vehicle Registration Number": "DL2CQN2571"
    },
    "timeStamp": "20200110T1647020530"
    }`}
            </pre>
          </div>
        </div>
      </ContentSection>

      {/* Error Pattern */}
      <ContentSection id="error-pattern" title="Error Pattern">
        <br />
        <div className="space-y-6">
          <p className="text-gray-700">
            Standard error response format used across all API endpoints.
          </p>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Error Response Structure:</h4>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
{`{
  "code": 400,
  "status": "FAILURE",
  "payload": {
    "errors": [
      {
        "reason": "Error description",
        "errorCode": 400
      }
    ]
  },
  "message": "Bad Request"
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Common HTTP Status Codes:</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-2 border text-left">Code</th>
                    <th className="px-4 py-2 border text-left">Status</th>
                    <th className="px-4 py-2 border text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-4 py-2 border font-mono">200</td>
                    <td className="px-4 py-2 border">OK</td>
                    <td className="px-4 py-2 border">Request successful</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border font-mono">400</td>
                    <td className="px-4 py-2 border">Bad Request</td>
                    <td className="px-4 py-2 border">Invalid request parameters</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border font-mono">401</td>
                    <td className="px-4 py-2 border">Unauthorized</td>
                    <td className="px-4 py-2 border">Authentication required or failed</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border font-mono">422</td>
                    <td className="px-4 py-2 border">Unprocessable Entity</td>
                    <td className="px-4 py-2 border">Invalid or missing required parameters</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 border font-mono">500</td>
                    <td className="px-4 py-2 border">Internal Server Error</td>
                    <td className="px-4 py-2 border">An error occurred on the server</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Notes */}
      <ContentSection id="notes" title="Notes">
        <br />
        <div className="space-y-6">
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Important Notes:</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Token expires within 4 hours - generate refresh token periodically</li>
              <li>All amount values are in PAISA format (1 Rupee = 100 Paisa)</li>
              <li><code className="bg-blue-100 px-2 py-1 rounded">custConvFee</code> is platform charge decided by the agent</li>
              <li>Fetch categories and billers once or twice per week as data doesn't change frequently</li>
              <li>The <code className="bg-blue-100 px-2 py-1 rounded">refId</code> includes first five characters of organization name</li>
            </ul>
          </div>

          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Payment Amount Above ₹50,000:</h4>
            <p className="text-gray-700">
              For transactions above ₹50,000, the following information must be provided in <code className="bg-yellow-100 px-2 py-1 rounded">customerDetails</code>:
            </p>
            <ul className="list-disc list-inside space-y-1 text-gray-700 mt-2">
              <li>Remitter Name (Mandatory)</li>
            </ul>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4">
            <h4 className="font-semibold text-gray-900 mb-3">Credit Card Category:</h4>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              <li>Remitter Name is mandatory in payment request</li>
              <li>In Bill Fetch API, remitter name is optional under customerDetails</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="payment-mode-info" title="Payment Mode & Payment Information">
        <br />
        <div className="space-y-6">
          <p className="text-gray-700">
            Required payment account information for different payment modes.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border text-left">Payment Mode</th>
                  <th className="px-4 py-2 border text-left">Description</th>
                  <th className="px-4 py-2 border text-left">Required Payment Account Info</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">Credit Card</td>
                  <td className="px-4 py-2 border">Credit Card</td>
                  <td className="px-4 py-2 border font-mono text-sm">CardNum|AuthCode</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Debit Card</td>
                  <td className="px-4 py-2 border">Debit Card</td>
                  <td className="px-4 py-2 border font-mono text-sm">CardNum|AuthCode</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Internet Banking</td>
                  <td className="px-4 py-2 border">Internet Banking</td>
                  <td className="px-4 py-2 border font-mono text-sm">IFSC|AccountNo</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">UPI</td>
                  <td className="px-4 py-2 border">Unified Payments Interface</td>
                  <td className="px-4 py-2 border font-mono text-sm">VPA (Virtual Payment Address)</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Cash</td>
                  <td className="px-4 py-2 border">Cash</td>
                  <td className="px-4 py-2 border font-mono text-sm">Remarks</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">IMPS</td>
                  <td className="px-4 py-2 border">Immediate Payment Service</td>
                  <td className="px-4 py-2 border font-mono text-sm">MMID|MobileNo</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Wallet</td>
                  <td className="px-4 py-2 border">Wallet</td>
                  <td className="px-4 py-2 border font-mono text-sm">WalletName|MobileNo</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ContentSection>

      <ContentSection id="payment-mode-vs-initiating-channel" title="Payment Mode VS Initiating Channel Combinations">
        <div className="space-y-6">
          <p className="text-gray-700">
            Valid combinations of payment modes and initiating channels.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border text-left">Payment Mode</th>
                  <th className="px-4 py-2 border text-center">INT (Internet)</th>
                  <th className="px-4 py-2 border text-center">MOB (Mobile)</th>
                  <th className="px-4 py-2 border text-center">AGT (Agent)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2 border">Cash</td>
                  <td className="px-4 py-2 border text-center">❌</td>
                  <td className="px-4 py-2 border text-center">❌</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Internet Banking</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">❌</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Credit Card</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Debit Card</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">UPI</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">AEPS</td>
                  <td className="px-4 py-2 border text-center">❌</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                </tr>
                <tr>
                  <td className="px-4 py-2 border">Wallet</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                  <td className="px-4 py-2 border text-center">✅</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </ContentSection>
    </div>
  );
};