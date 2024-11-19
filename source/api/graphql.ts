/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
  /** Decimal custom scalar type */
  Decimal: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
  /** Monetary decimal custom scalar type, we stored and operate the value in cents, and this scalar will convert the value to dollar when read and convert the value to cents when write. */
  MonetaryDecimal: { input: any; output: any; }
};

export type AccessRole = {
  __typename?: 'AccessRole';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['String']['output'];
  primaryAccountEmailAddress?: Maybe<Scalars['String']['output']>;
  profile?: Maybe<PublicProfile>;
  status: AccessRoleStatus;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

/** The status of an access role for an account/profile */
export enum AccessRoleStatus {
  Active = 'Active',
  Expired = 'Expired',
  Revoked = 'Revoked'
}

export type Account = {
  __typename?: 'Account';
  accountEmails: Array<AccountEmail>;
  createdAt: Scalars['DateTimeISO']['output'];
  currentProfile?: Maybe<Profile>;
  currentSession?: Maybe<AccountSession>;
  defaultProfile?: Maybe<Profile>;
  defaultProfileId?: Maybe<Scalars['String']['output']>;
  primaryAccountEmail?: Maybe<AccountEmail>;
  roles: Array<AccessRole>;
};

export type AccountAdminQueryObject = {
  __typename?: 'AccountAdminQueryObject';
  emailAddress: Scalars['String']['output'];
  profiles: Array<PublicProfile>;
};

export type AccountEmail = {
  __typename?: 'AccountEmail';
  createdAt: Scalars['DateTimeISO']['output'];
  emailAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  isVerified: Scalars['Boolean']['output'];
  source: Scalars['String']['output'];
  type: AccountEmailType;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type AccountEmailAddressesResult = {
  __typename?: 'AccountEmailAddressesResult';
  count: Scalars['Float']['output'];
  emailAddresses: Array<AccountEmail>;
};

/** The type of an account email */
export enum AccountEmailType {
  Primary = 'Primary',
  Secondary = 'Secondary'
}

export type AccountEmailVerificationCompleteInput = {
  code: Scalars['String']['input'];
  makePrimary?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AccountEmailVerificationSendInput = {
  emailAddress: Scalars['String']['input'];
};

export type AccountEncryptionConfiguration = {
  publicKey: Scalars['String']['input'];
  transitKeyId: Scalars['String']['input'];
};

export type AccountPasswordCreateInput = {
  newPassword: Scalars['String']['input'];
};

export type AccountPasswordVerifyInput = {
  password: Scalars['String']['input'];
};

export type AccountProfileUpdateInput = {
  birthday?: InputMaybe<Scalars['DateTimeISO']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  familyName?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<Scalars['String']['input']>;
  givenName?: InputMaybe<Scalars['String']['input']>;
  middleName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  preferredName?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AccountRegistrationCompleteInput = {
  displayName?: InputMaybe<Scalars['String']['input']>;
  encryptionConfiguration?: InputMaybe<AccountEncryptionConfiguration>;
  familyName?: InputMaybe<Scalars['String']['input']>;
  givenName?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type AccountRegistrationOrSignInCreateInput = {
  emailAddress: Scalars['String']['input'];
};

export type AccountSession = {
  __typename?: 'AccountSession';
  createdAt: Scalars['DateTimeISO']['output'];
  currentProfileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastUsed?: Maybe<Scalars['DateTimeISO']['output']>;
  status: AccountSessionStatus;
  statusChangedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type AccountSessionDeleteInput = {
  sessionIds: Array<Scalars['String']['input']>;
};

/** The status of an account session */
export enum AccountSessionStatus {
  Active = 'Active',
  Expired = 'Expired',
  Revoked = 'Revoked'
}

export type AddressBookEntry = {
  __typename?: 'AddressBookEntry';
  city: Scalars['String']['output'];
  company?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
  state: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** The tier of a saved address book entry */
export enum AddressBookEntryTier {
  Primary = 'Primary',
  Secondary = 'Secondary'
}

export type AppleStoreTransactionOrderMapping = {
  __typename?: 'AppleStoreTransactionOrderMapping';
  commerceOrder: CommerceOrder;
  commerceOrderId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  transactionId: Scalars['String']['output'];
};

export type AtlasNode = {
  __typename?: 'AtlasNode';
  alias: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  region: Region;
  regionId: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** The type of procedure. */
export enum AtlasProcedureType {
  NorpCheck = 'NorpCheck',
  PortScan = 'PortScan'
}

export type AuthenticationChallenge = {
  __typename?: 'AuthenticationChallenge';
  challengeType: Scalars['String']['output'];
  status: AuthenticationChallengeStatus;
};

/** The status of an authentication challenge. */
export enum AuthenticationChallengeStatus {
  Failed = 'Failed',
  Open = 'Open',
  Success = 'Success'
}

export type AuthenticationEmailVerification = {
  __typename?: 'AuthenticationEmailVerification';
  authentication: AuthenticationSession;
  verification: EmailVerification;
};

export type AuthenticationOperationResult = {
  __typename?: 'AuthenticationOperationResult';
  authentication: AuthenticationSession;
  success: Scalars['Boolean']['output'];
};

export type AuthenticationRegistrationOrSignIn = {
  __typename?: 'AuthenticationRegistrationOrSignIn';
  authentication: AuthenticationSession;
  emailAddress: Scalars['String']['output'];
};

export type AuthenticationSession = {
  __typename?: 'AuthenticationSession';
  createdAt: Scalars['DateTimeISO']['output'];
  currentChallenge?: Maybe<AuthenticationChallenge>;
  scopeType: Scalars['String']['output'];
  status: AuthenticationSessionStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** The status of the authentication session. */
export enum AuthenticationSessionStatus {
  Authenticated = 'Authenticated',
  AuthenticationExpired = 'AuthenticationExpired',
  AuthenticationUsed = 'AuthenticationUsed',
  ChallengeExpired = 'ChallengeExpired',
  ChallengeFailed = 'ChallengeFailed',
  Challenged = 'Challenged',
  CanTransition = 'canTransition',
  IsChallengeFailure = 'isChallengeFailure',
  IsOpen = 'isOpen',
  OpenStatuses = 'openStatuses'
}

export type AvailableMetadata = {
  __typename?: 'AvailableMetadata';
  dataType: Scalars['String']['output'];
  key: Scalars['String']['output'];
};

export type AvailableMetadataInput = {
  dataType: Scalars['String']['input'];
  key: Scalars['String']['input'];
};

export type CampaignDeliveryStage = {
  __typename?: 'CampaignDeliveryStage';
  completedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  emailTemplateContentId?: Maybe<Scalars['String']['output']>;
  emailTemplateId?: Maybe<Scalars['String']['output']>;
  emailsSent?: Maybe<Scalars['Int']['output']>;
  indexId: Scalars['Int']['output'];
  percentSent?: Maybe<Scalars['Int']['output']>;
  percentToSend: Scalars['Int']['output'];
  stageStatus: CampaignDeliveryStageStatus;
  startedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

/** The status of the delivery stage */
export enum CampaignDeliveryStageStatus {
  Complete = 'Complete',
  InProgress = 'InProgress',
  NotStarted = 'NotStarted',
  PausingForError = 'PausingForError'
}

export type ClientProperties = {
  environment?: InputMaybe<Scalars['String']['input']>;
};

export type Cluster = {
  __typename?: 'Cluster';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  enabled: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type ColumnFilter = {
  caseSensitive?: InputMaybe<Scalars['Boolean']['input']>;
  column: Scalars['String']['input'];
  operator: ColumnFilterConditionOperator;
  value: Scalars['JSON']['input'];
};

/** The operator of a field filter */
export enum ColumnFilterConditionOperator {
  Equal = 'Equal',
  GreaterThan = 'GreaterThan',
  GreaterThanOrEqual = 'GreaterThanOrEqual',
  In = 'In',
  IsNotNull = 'IsNotNull',
  IsNull = 'IsNull',
  LessThan = 'LessThan',
  LessThanOrEqual = 'LessThanOrEqual',
  Like = 'Like',
  NotEqual = 'NotEqual',
  NotIn = 'NotIn',
  NotLike = 'NotLike'
}

export type ColumnFilterGroup = {
  conditions?: InputMaybe<Array<ColumnFilter>>;
  filters?: InputMaybe<Array<ColumnFilterGroup>>;
  operator?: InputMaybe<ColumnFilterGroupOperator>;
};

export enum ColumnFilterGroupOperator {
  And = 'And',
  Or = 'Or'
}

export type CommerceCheckoutSession = {
  __typename?: 'CommerceCheckoutSession';
  closedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  completedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  externalMetadata?: Maybe<Scalars['JSON']['output']>;
  failedCount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  orders?: Maybe<Array<CommerceOrder>>;
  status: CommerceCheckoutSessionStatus;
};

export type CommerceCheckoutSessionCreateInput = {
  emailAddress: Scalars['String']['input'];
  itemIds: Array<Scalars['String']['input']>;
  paymentProcessorType?: PaymentProcessorType;
};

export enum CommerceCheckoutSessionStatus {
  Closed = 'Closed',
  Complete = 'Complete',
  Expired = 'Expired',
  Failed = 'Failed',
  Pending = 'Pending'
}

export type CommerceOrder = {
  __typename?: 'CommerceOrder';
  batchIdentifier: Scalars['String']['output'];
  beneficiaryEmailAddress?: Maybe<Scalars['String']['output']>;
  checkoutSessionId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  discounts?: Maybe<Array<Discount>>;
  emailAddress: Scalars['String']['output'];
  fulfillmentSource?: Maybe<Scalars['String']['output']>;
  fulfillmentStatus: CommerceOrderFulfillmentStatus;
  holdOnShipping: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  lineItems?: Maybe<Array<CommerceOrderLineItem>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  orderLogs?: Maybe<Array<CommerceOrderLog>>;
  payment?: Maybe<Payment>;
  paymentId?: Maybe<Scalars['String']['output']>;
  paymentStatus?: Maybe<PaymentStatus>;
  priceInfo: CommerceOrderPrice;
  shipments?: Maybe<Array<Shipment>>;
  shippingInfo?: Maybe<CommerceOrderShippingInfo>;
  source: Scalars['String']['output'];
  status: CommerceOrderStatus;
  statusDescription?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** The fulfillment status of the order */
export enum CommerceOrderFulfillmentStatus {
  Cancelled = 'Cancelled',
  Fulfilled = 'Fulfilled',
  NotStart = 'NotStart',
  PartiallyFulfilled = 'PartiallyFulfilled',
  Shipped = 'Shipped',
  Unfulfilled = 'Unfulfilled'
}

export type CommerceOrderLineItem = {
  __typename?: 'CommerceOrderLineItem';
  commerceOrderId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  fulfilledQuantity: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  indexId: Scalars['Int']['output'];
  productVariantId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  shippedQuantity: Scalars['Int']['output'];
  status: CommerceOrderLineItemStatus;
  statusDescription?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type CommerceOrderLineItemPrice = {
  __typename?: 'CommerceOrderLineItemPrice';
  amount: Scalars['MonetaryDecimal']['output'];
  indexId: Scalars['Int']['output'];
  originalSubtotal: Scalars['MonetaryDecimal']['output'];
  subtotal: Scalars['MonetaryDecimal']['output'];
  tax: Scalars['MonetaryDecimal']['output'];
};

/** The status of the order line item */
export enum CommerceOrderLineItemStatus {
  Cancelled = 'Cancelled',
  Pending = 'Pending',
  Shipped = 'Shipped'
}

export type CommerceOrderLog = {
  __typename?: 'CommerceOrderLog';
  commerceOrderId: Scalars['String']['output'];
  content?: Maybe<Scalars['JSON']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  source: CommerceOrderLogSource;
  visibility: CommerceOrderLogVisibility;
};

/** The source of the order log. */
export enum CommerceOrderLogSource {
  CustomerSupport = 'CustomerSupport',
  System = 'System',
  User = 'User'
}

/** The visibility of the order log. */
export enum CommerceOrderLogVisibility {
  Internal = 'Internal',
  Public = 'Public'
}

export type CommerceOrderPrice = {
  __typename?: 'CommerceOrderPrice';
  amount: Scalars['MonetaryDecimal']['output'];
  currencyCode: Scalars['String']['output'];
  lineItemPrices: Array<CommerceOrderLineItemPrice>;
  originalSubtotal: Scalars['MonetaryDecimal']['output'];
  shippingRate: CommerceOrderShippingRate;
  subtotal: Scalars['MonetaryDecimal']['output'];
  tax: CommerceOrderTax;
};

export type CommerceOrderResult = CommerceOrder | PublicCommerceOrder;

export type CommerceOrderShippingInfo = {
  __typename?: 'CommerceOrderShippingInfo';
  shippingAddress: StreetAddressObject;
};

export type CommerceOrderShippingRate = {
  __typename?: 'CommerceOrderShippingRate';
  amount: Scalars['MonetaryDecimal']['output'];
  breakdown: Array<CommerceOrderShippingRateBreakdown>;
  originalAmount: Scalars['MonetaryDecimal']['output'];
};

export type CommerceOrderShippingRateBreakdown = {
  __typename?: 'CommerceOrderShippingRateBreakdown';
  freeShipping: Scalars['Boolean']['output'];
  items: Array<CommerceOrderShippingRateBreakdownItem>;
  originalShippingRate: Scalars['MonetaryDecimal']['output'];
  packageIndexId: Scalars['Int']['output'];
  shippingRate: Scalars['MonetaryDecimal']['output'];
};

export type CommerceOrderShippingRateBreakdownItem = {
  __typename?: 'CommerceOrderShippingRateBreakdownItem';
  indexId: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
};

/** The status of the order */
export enum CommerceOrderStatus {
  Archived = 'Archived',
  Cancelled = 'Cancelled',
  Complete = 'Complete',
  FailToConfirm = 'FailToConfirm',
  Open = 'Open',
  OutOfStock = 'OutOfStock',
  Pending = 'Pending',
  WaitPayment = 'WaitPayment'
}

export type CommerceOrderTax = {
  __typename?: 'CommerceOrderTax';
  shipping: Scalars['MonetaryDecimal']['output'];
  total: Scalars['MonetaryDecimal']['output'];
};

export type Contact = {
  __typename?: 'Contact';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  fields?: Maybe<Array<ContactField>>;
  id: Scalars['String']['output'];
  metadata: Scalars['JSON']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  source: Scalars['String']['output'];
  type: ContactType;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type ContactCreateInput = {
  fields?: InputMaybe<Array<ContactFieldCreateInput>>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
  source: Scalars['String']['input'];
  type: ContactType;
};

export type ContactField = {
  __typename?: 'ContactField';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  label?: Maybe<Scalars['String']['output']>;
  type: ContactFieldType;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
  value: Scalars['JSON']['output'];
};

export type ContactFieldCreateInput = {
  label?: InputMaybe<Scalars['String']['input']>;
  type: ContactFieldType;
  value: Scalars['JSON']['input'];
};

/** Type of contact field */
export enum ContactFieldType {
  EmailAddress = 'EmailAddress',
  PhoneNumber = 'PhoneNumber',
  StreetAddress = 'StreetAddress'
}

export type ContactFieldUpdateInput = {
  action: ListEntryAction;
  id?: InputMaybe<Scalars['String']['input']>;
  label?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<ContactFieldType>;
  value?: InputMaybe<Scalars['JSON']['input']>;
};

/** Type of contact */
export enum ContactType {
  Company = 'Company',
  Person = 'Person'
}

export type ContactUpdateInput = {
  id: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDiscountInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  endsAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  newRule?: InputMaybe<CreateDiscountRuleInput>;
  ruleId?: InputMaybe<Scalars['String']['input']>;
  startsAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  type: DiscountType;
};

export type CreateDiscountRuleInput = {
  allocation: DiscountAllocationInput;
  conditions?: InputMaybe<Array<DiscountRuleConditionInput>>;
  displayTitle: Scalars['String']['input'];
  oncePerCustomer?: InputMaybe<Scalars['Boolean']['input']>;
  title: Scalars['String']['input'];
};

export type CreateEmailListEntryInput = {
  emailAddress: Scalars['String']['input'];
  familyName?: InputMaybe<Scalars['String']['input']>;
  givenName?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
};

export type CreateEmailListInput = {
  entries: Array<CreateEmailListEntryInput>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateEmailTemplateContentInput = {
  body: Scalars['String']['input'];
  contentFormat?: InputMaybe<EmailContentFormat>;
  languageCode?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<EmailTemplateMetadataInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
};

export type CreateEmailTemplateInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  connectToAutomationKey?: InputMaybe<Scalars['String']['input']>;
  content: CreateEmailTemplateContentInput;
  description?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type CreateEngagementEventInput = {
  clientProperties?: InputMaybe<ClientProperties>;
  deviceProperties: DeviceProperties;
  eventContext?: InputMaybe<EngagementEventContext>;
  locale?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type CreateOrderInput = {
  beneficiaryEmailAddress?: InputMaybe<Scalars['String']['input']>;
  emailAddress: Scalars['String']['input'];
  lineItems: Array<OrderLineItemInput>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  paymentMethod?: InputMaybe<CreateOrderPaymentMethodInput>;
  shippingAddress?: InputMaybe<StreetAddressInput>;
};

export type CreateOrderPaymentMethodInput = {
  newPaymentMethod?: InputMaybe<PaymentMethodInput>;
  saveToWalletAs?: InputMaybe<Scalars['String']['input']>;
  walletEntryId?: InputMaybe<Scalars['String']['input']>;
};

export type CreateProductBundleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  identifier: Scalars['String']['input'];
  items: Array<CreateProductBundleItemInput>;
  name: Scalars['String']['input'];
  visibility?: InputMaybe<ProductBundleVisibility>;
};

export type CreateProductBundleItemInput = {
  productVariantId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};

export type CreateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  variants: Array<CreateProductVariantInput>;
  vendorId: Scalars['String']['input'];
};

export type CreateProductVariantInput = {
  attributes?: InputMaybe<Array<ProductVariantAttributeInput>>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  gtin?: InputMaybe<Scalars['String']['input']>;
  inventoryPolicy: ProductVariantInventoryPolicy;
  isVirtual?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  position?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<ProductVariantPriceInput>;
  productId?: InputMaybe<Scalars['String']['input']>;
  setDefault?: InputMaybe<Scalars['Boolean']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  unitInfo?: InputMaybe<ProductVariantUnitInfoInput>;
};

export type CreateVendorInput = {
  address: StreetAddressInput;
  description?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export enum CreditCardType {
  Amex = 'Amex',
  Discover = 'Discover',
  Mastercard = 'Mastercard',
  Unknown = 'Unknown',
  Visa = 'Visa'
}

export type DataInteractionDatabaseMetrics = {
  __typename?: 'DataInteractionDatabaseMetrics';
  data: Array<Scalars['JSON']['output']>;
  timeInterval: TimeInterval;
};

export type DataInteractionDatabaseRelationInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  fieldName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  inverseFieldName?: InputMaybe<Scalars['String']['input']>;
  inverseTableName?: InputMaybe<Scalars['String']['input']>;
  inverseType?: InputMaybe<Scalars['String']['input']>;
  tableName: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type DataInteractionDatabaseTableMetricsQueryInput = {
  columnName: Scalars['String']['input'];
  databaseName: Scalars['String']['input'];
  endTime?: InputMaybe<Scalars['DateTimeISO']['input']>;
  startTime?: InputMaybe<Scalars['DateTimeISO']['input']>;
  tableName: Scalars['String']['input'];
  timeIntervals?: InputMaybe<Array<TimeInterval>>;
};

export type DataInteractionDatabaseTableRowCreateInput = {
  data: Scalars['JSON']['input'];
  databaseName: Scalars['String']['input'];
  relationData?: InputMaybe<Array<DataInteractionDatabaseRelationInput>>;
  tableName: Scalars['String']['input'];
};

export type DataInteractionDatabaseTableRowUpdateInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  databaseName: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  tableName: Scalars['String']['input'];
};

export type DatabaseTableColumn = {
  __typename?: 'DatabaseTableColumn';
  isGenerated: Scalars['Boolean']['output'];
  isKey: Scalars['Boolean']['output'];
  isNullable: Scalars['Boolean']['output'];
  isPrimaryKey: Scalars['Boolean']['output'];
  keyTableName?: Maybe<Scalars['String']['output']>;
  length: Scalars['String']['output'];
  name: Scalars['String']['output'];
  possibleValues?: Maybe<Array<Scalars['String']['output']>>;
  type: Scalars['String']['output'];
};

export type DatabaseTableMetadata = {
  __typename?: 'DatabaseTableMetadata';
  columns?: Maybe<Array<DatabaseTableColumn>>;
  databaseName: Scalars['String']['output'];
  items?: Maybe<Array<Scalars['JSON']['output']>>;
  pagination?: Maybe<Pagination>;
  relations?: Maybe<Array<DatabaseTableRelation>>;
  rowCount: Scalars['Int']['output'];
  tableName: Scalars['String']['output'];
};

export type DatabaseTableRelation = {
  __typename?: 'DatabaseTableRelation';
  fieldName: Scalars['String']['output'];
  inverseFieldName?: Maybe<Scalars['String']['output']>;
  inverseTableName?: Maybe<Scalars['String']['output']>;
  inverseType?: Maybe<Scalars['String']['output']>;
  joinColumns?: Maybe<Array<Scalars['String']['output']>>;
  tableName: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type DatabaseTableRowData = {
  __typename?: 'DatabaseTableRowData';
  columns?: Maybe<Array<DatabaseTableColumn>>;
  databaseName: Scalars['String']['output'];
  item?: Maybe<Scalars['JSON']['output']>;
  relations?: Maybe<Array<DatabaseTableRelation>>;
  tableName: Scalars['String']['output'];
};

export type DatabaseTablesResult = {
  __typename?: 'DatabaseTablesResult';
  items: Array<DatabaseTableMetadata>;
  pagination?: Maybe<Pagination>;
};

export type DatebaseMetadata = {
  __typename?: 'DatebaseMetadata';
  databaseName: Scalars['String']['output'];
};

/** The status of the delivery */
export enum DeliveryStatus {
  AttemptedDelivery = 'AttemptedDelivery',
  Delivered = 'Delivered',
  InTransit = 'InTransit',
  OutForDelivery = 'OutForDelivery',
  ReadyForPickup = 'ReadyForPickup'
}

export enum DeviceOrientation {
  Landscape = 'Landscape',
  NotAvailable = 'NotAvailable',
  Portrait = 'Portrait'
}

export type DeviceProperties = {
  cpu?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  memory?: InputMaybe<Scalars['String']['input']>;
  model?: InputMaybe<Scalars['String']['input']>;
  operatingSystemName?: InputMaybe<Scalars['String']['input']>;
  operatingSystemVersion?: InputMaybe<Scalars['String']['input']>;
  orientation?: InputMaybe<DeviceOrientation>;
  resolution?: InputMaybe<Scalars['String']['input']>;
};

export type DiscordWebhookMessageCreateEmbed = {
  authorName?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['DateTimeISO']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DiscordWebhookMessageCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  embeds?: InputMaybe<Array<DiscordWebhookMessageCreateEmbed>>;
  token: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
  webhookId: Scalars['String']['input'];
};

export type Discount = {
  __typename?: 'Discount';
  code?: Maybe<Scalars['String']['output']>;
  conditions: Array<DiscountCondition>;
  createdAt: Scalars['DateTimeISO']['output'];
  endsAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['String']['output'];
  rule?: Maybe<DiscountRule>;
  startsAt?: Maybe<Scalars['DateTimeISO']['output']>;
  type: DiscountType;
  updatedAt: Scalars['DateTimeISO']['output'];
  usageCount: Scalars['Int']['output'];
};

export type DiscountAllocationInput = {
  buyThisGetY?: InputMaybe<Scalars['Int']['input']>;
  buyThisGetYAmount?: InputMaybe<Scalars['MonetaryDecimal']['input']>;
  buyXAmountGetThis?: InputMaybe<Scalars['MonetaryDecimal']['input']>;
  buyXGetThis?: InputMaybe<Scalars['Int']['input']>;
  maxAllocationLimit: Scalars['Float']['input'];
  method: DiscountAllocationMethod;
  target: DiscountAllocationTarget;
  value: Scalars['MonetaryDecimal']['input'];
  valueType: DiscountValueType;
};

export enum DiscountAllocationMethod {
  BuyXGetFollowing = 'BuyXGetFollowing',
  BuyXGetY = 'BuyXGetY',
  Flat = 'Flat'
}

export type DiscountAllocationObject = {
  __typename?: 'DiscountAllocationObject';
  buyThisGetY?: Maybe<Scalars['Int']['output']>;
  buyThisGetYAmount?: Maybe<Scalars['MonetaryDecimal']['output']>;
  buyXAmountGetThis?: Maybe<Scalars['MonetaryDecimal']['output']>;
  buyXGetThis?: Maybe<Scalars['Int']['output']>;
  maxAllocationLimit: Scalars['Float']['output'];
  method: DiscountAllocationMethod;
  target: DiscountAllocationTarget;
  value: Scalars['MonetaryDecimal']['output'];
  valueType: DiscountValueType;
};

export enum DiscountAllocationTarget {
  Across = 'Across',
  Each = 'Each',
  ShippingAmount = 'ShippingAmount',
  ShippingBreakdown = 'ShippingBreakdown'
}

export type DiscountCondition = {
  __typename?: 'DiscountCondition';
  createdAt: Scalars['DateTimeISO']['output'];
  discountRuleId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  quantityRequirement?: Maybe<DiscountConditionRequirementObject>;
  referenceId: Scalars['String']['output'];
  subtotalRequirement?: Maybe<DiscountConditionRequirementObject>;
  target: DiscountConditionTarget;
  type: DiscountConditionType;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type DiscountConditionRequirementInput = {
  maxValue?: InputMaybe<Scalars['Int']['input']>;
  minValue?: InputMaybe<Scalars['Int']['input']>;
  requiredValue?: InputMaybe<Scalars['Int']['input']>;
};

export type DiscountConditionRequirementObject = {
  __typename?: 'DiscountConditionRequirementObject';
  maxValue?: Maybe<Scalars['Int']['output']>;
  minValue?: Maybe<Scalars['Int']['output']>;
  requiredValue?: Maybe<Scalars['Int']['output']>;
};

export enum DiscountConditionTarget {
  EntireOrder = 'EntireOrder',
  LineItem = 'LineItem'
}

export enum DiscountConditionType {
  ProductVariants = 'ProductVariants',
  Products = 'Products',
  Vendors = 'Vendors'
}

export type DiscountRule = {
  __typename?: 'DiscountRule';
  allocation: DiscountAllocationObject;
  conditions: Array<DiscountCondition>;
  createdAt: Scalars['DateTimeISO']['output'];
  displayTitle: Scalars['String']['output'];
  id: Scalars['String']['output'];
  oncePerCustomer: Scalars['Boolean']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type DiscountRuleConditionInput = {
  discountRuleId?: InputMaybe<Scalars['String']['input']>;
  quantityRequirement?: InputMaybe<DiscountConditionRequirementInput>;
  /** The id of the typed entity, e.g. product id, product variant id, etc. */
  referenceId: Scalars['String']['input'];
  subtotalRequirement?: InputMaybe<DiscountConditionRequirementInput>;
  target: DiscountConditionTarget;
  type: DiscountConditionType;
};

/** The type of the discount. */
export enum DiscountType {
  Automatic = 'Automatic',
  Code = 'Code'
}

export enum DiscountValueType {
  FixedAmount = 'FixedAmount',
  Percentage = 'Percentage'
}

export type EmailAutomation = {
  __typename?: 'EmailAutomation';
  automationKey: Scalars['String']['output'];
  availableMetadata?: Maybe<Array<AvailableMetadata>>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  emailTemplate?: Maybe<EmailTemplate>;
  emailTemplateId?: Maybe<Scalars['String']['output']>;
  fromEmail: Scalars['String']['output'];
  fromName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  subject: Scalars['String']['output'];
  type: EmailAutomationType;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type EmailAutomationResult = {
  __typename?: 'EmailAutomationResult';
  items: Array<EmailAutomation>;
  pagination?: Maybe<Pagination>;
};

/** Email automation type */
export enum EmailAutomationType {
  BuiltIn = 'BuiltIn',
  Custom = 'Custom'
}

export type EmailCampaign = {
  __typename?: 'EmailCampaign';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  currentStageIndexId: Scalars['Int']['output'];
  deliveryStages: Array<CampaignDeliveryStage>;
  description?: Maybe<Scalars['String']['output']>;
  fromEmail: Scalars['String']['output'];
  fromName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  pagedEmailAddresses?: Maybe<PagedEmailCampaignEmailAddress>;
  status: EmailCampaignStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};


export type EmailCampaignPagedEmailAddressesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};

export type EmailCampaignCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  emailAddressInputs?: InputMaybe<Array<EmailCampaignEmailAddressInput>>;
  emailListInputs?: InputMaybe<Array<EmailCampaignEmailListInput>>;
  emailTemplateContentId?: InputMaybe<Scalars['String']['input']>;
  emailTemplateId?: InputMaybe<Scalars['String']['input']>;
  fromEmail: Scalars['String']['input'];
  fromName: Scalars['String']['input'];
  stageInputs: Array<EmailCampaignStageInput>;
  title: Scalars['String']['input'];
};

export type EmailCampaignEmailAddress = {
  __typename?: 'EmailCampaignEmailAddress';
  createdAt: Scalars['DateTimeISO']['output'];
  emailAddress: Scalars['String']['output'];
  emailContent?: Maybe<EmailCampaignEmailContent>;
  id: Scalars['String']['output'];
  presetSendStage?: Maybe<Scalars['Int']['output']>;
  sendAttempts?: Maybe<Scalars['Int']['output']>;
  sentAt?: Maybe<Scalars['DateTimeISO']['output']>;
  sentStage?: Maybe<Scalars['Int']['output']>;
  status: EmailCampaignEmailAddressStatus;
  statusDescription?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type EmailCampaignEmailAddressInput = {
  emailAddress: Scalars['String']['input'];
  presetSendStage?: InputMaybe<Scalars['Int']['input']>;
};

/** The status of an email address in an email campaign */
export enum EmailCampaignEmailAddressStatus {
  Pending = 'Pending',
  PermanentFailure = 'PermanentFailure',
  SendFailed = 'SendFailed',
  Sent = 'Sent'
}

export type EmailCampaignEmailAddressUpdateInput = {
  action: ListEntryAction;
  emailAddress: Scalars['String']['input'];
  presetSendStage?: InputMaybe<Scalars['Int']['input']>;
};

export type EmailCampaignEmailContent = {
  __typename?: 'EmailCampaignEmailContent';
  content: Scalars['String']['output'];
  contentFormat: EmailContentFormat;
  fromEmailAddress: Scalars['String']['output'];
  fromName: Scalars['String']['output'];
  subject: Scalars['String']['output'];
};

export type EmailCampaignEmailListInput = {
  emailListId: Scalars['String']['input'];
  presetSendStage?: InputMaybe<Scalars['Int']['input']>;
};

export type EmailCampaignStageInput = {
  emailTemplateContentId?: InputMaybe<Scalars['String']['input']>;
  emailTemplateId?: InputMaybe<Scalars['String']['input']>;
  indexId: Scalars['Int']['input'];
  percentToSend: Scalars['Int']['input'];
};

export type EmailCampaignStageUpdateInput = {
  action: ListEntryAction;
  emailTemplateContentId?: InputMaybe<Scalars['String']['input']>;
  emailTemplateId?: InputMaybe<Scalars['String']['input']>;
  indexId: Scalars['Int']['input'];
  percentToSend?: InputMaybe<Scalars['Int']['input']>;
};

/** The status of the email campaign */
export enum EmailCampaignStatus {
  Active = 'Active',
  Archive = 'Archive',
  Complete = 'Complete',
  Draft = 'Draft',
  InProgress = 'InProgress'
}

export type EmailCampaignUpdateInput = {
  id: Scalars['String']['input'];
  newDescription?: InputMaybe<Scalars['String']['input']>;
  newFromEmail?: InputMaybe<Scalars['String']['input']>;
  newFromName?: InputMaybe<Scalars['String']['input']>;
  newTitle?: InputMaybe<Scalars['String']['input']>;
  stagesToUpdate?: InputMaybe<Array<EmailCampaignStageUpdateInput>>;
};

export type EmailContactInput = {
  content: Scalars['String']['input'];
  contentFormat?: InputMaybe<EmailContentFormat>;
  fromAddress: Scalars['String']['input'];
  fromName?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
};

/** The format of an email content */
export enum EmailContentFormat {
  Html = 'HTML',
  Plain = 'Plain',
  ToContentType = 'toContentType'
}

export type EmailList = {
  __typename?: 'EmailList';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  pagedEmailListEntries?: Maybe<PagedEmailListEntries>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};


export type EmailListPagedEmailListEntriesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};

export type EmailListEntry = {
  __typename?: 'EmailListEntry';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  emailAddress: Scalars['String']['output'];
  familyName?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  hashCode: Scalars['String']['output'];
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type EmailTemplate = {
  __typename?: 'EmailTemplate';
  alias: Scalars['String']['output'];
  contentHistory: Array<EmailTemplateContent>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  currentContent?: Maybe<EmailTemplateContent>;
  currentVersion: Scalars['Float']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  status: EmailTemplateStatus;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type EmailTemplateContent = {
  __typename?: 'EmailTemplateContent';
  activatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  body: Scalars['String']['output'];
  contentFormat: EmailContentFormat;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  languageCode: Scalars['String']['output'];
  metadata?: Maybe<EmailTemplateMetadataObject>;
  notes?: Maybe<Scalars['String']['output']>;
  subject: Scalars['String']['output'];
  version: Scalars['Float']['output'];
};

export type EmailTemplateContentEngagementMetrics = {
  __typename?: 'EmailTemplateContentEngagementMetrics';
  links: Array<EmailTemplateContentLinkEngagementMetrics>;
  opened: Scalars['Int']['output'];
  openedUnique: Scalars['Int']['output'];
  sent: Scalars['Int']['output'];
  sentError: Scalars['Int']['output'];
  sentErrorUnique: Scalars['Int']['output'];
  sentUnique: Scalars['Int']['output'];
};

export type EmailTemplateContentLinkEngagementMetrics = {
  __typename?: 'EmailTemplateContentLinkEngagementMetrics';
  clicked: Scalars['Int']['output'];
  clickedUnique: Scalars['Int']['output'];
  url: Scalars['String']['output'];
};

export type EmailTemplateImageAsset = {
  __typename?: 'EmailTemplateImageAsset';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrl: Scalars['String']['output'];
};

export type EmailTemplateImageAssetsResult = {
  __typename?: 'EmailTemplateImageAssetsResult';
  items: Array<EmailTemplateImageAsset>;
  pagination?: Maybe<Pagination>;
};

export type EmailTemplateLinkMetadataInput = {
  linkUrl: Scalars['String']['input'];
  replaceKey: Scalars['String']['input'];
};

export type EmailTemplateLinkMetadataObject = {
  __typename?: 'EmailTemplateLinkMetadataObject';
  linkUrl: Scalars['String']['output'];
  replaceKey: Scalars['String']['output'];
};

export type EmailTemplateMediaMetadataInput = {
  assetId: Scalars['String']['input'];
  replaceKey?: InputMaybe<Scalars['String']['input']>;
};

export type EmailTemplateMediaMetadataObject = {
  __typename?: 'EmailTemplateMediaMetadataObject';
  assetId: Scalars['String']['output'];
  replaceKey?: Maybe<Scalars['String']['output']>;
};

export type EmailTemplateMetadataInput = {
  links: Array<EmailTemplateLinkMetadataInput>;
  mediaAssets: Array<EmailTemplateMediaMetadataInput>;
  replaceableMarkups: Array<EmailTemplateReplaceableMarkupInput>;
};

export type EmailTemplateMetadataObject = {
  __typename?: 'EmailTemplateMetadataObject';
  links: Array<EmailTemplateLinkMetadataObject>;
  mediaAssets: Array<EmailTemplateMediaMetadataObject>;
  replaceableMarkups: Array<EmailTemplateReplaceableMarkupObject>;
};

export type EmailTemplateReplaceableMarkupInput = {
  markup: Scalars['String']['input'];
  placeHoldValue: Scalars['String']['input'];
  replaceKey: Scalars['String']['input'];
};

export type EmailTemplateReplaceableMarkupObject = {
  __typename?: 'EmailTemplateReplaceableMarkupObject';
  markup: Scalars['String']['output'];
  placeHoldValue: Scalars['String']['output'];
  replaceKey: Scalars['String']['output'];
};

/** The status of an email template */
export enum EmailTemplateStatus {
  Active = 'Active',
  Draft = 'Draft',
  Inactive = 'Inactive'
}

export type EmailTemplatesResult = {
  __typename?: 'EmailTemplatesResult';
  items: Array<EmailTemplate>;
  pagination?: Maybe<Pagination>;
};

export type EmailVerification = {
  __typename?: 'EmailVerification';
  emailAddress: Scalars['String']['output'];
  lastEmailSentAt?: Maybe<Scalars['DateTimeISO']['output']>;
  status: EmailVerificationStatus;
};

/** The verification status of an email address. */
export enum EmailVerificationStatus {
  Failed = 'Failed',
  Pending = 'Pending',
  Verified = 'Verified'
}

export type EmailVerificationVerifyInput = {
  code: Scalars['String']['input'];
};

export type EngagementEvent = {
  __typename?: 'EngagementEvent';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EngagementEventContext = {
  loadDurationInMilliseconds?: InputMaybe<Scalars['Int']['input']>;
  previousViewDurationInMilliseconds?: InputMaybe<Scalars['Int']['input']>;
  previousViewIdentifier?: InputMaybe<Scalars['String']['input']>;
  previousViewTitle?: InputMaybe<Scalars['String']['input']>;
  referrer?: InputMaybe<Scalars['String']['input']>;
  sessionDurationInMilliseconds?: InputMaybe<Scalars['Int']['input']>;
  viewDurationInMilliseconds?: InputMaybe<Scalars['Int']['input']>;
  viewIdentifier?: InputMaybe<Scalars['String']['input']>;
  viewTitle?: InputMaybe<Scalars['String']['input']>;
};

export type EngagementLocationOverview = {
  __typename?: 'EngagementLocationOverview';
  countryCode?: Maybe<Scalars['String']['output']>;
  latitude?: Maybe<Scalars['String']['output']>;
  longitude?: Maybe<Scalars['String']['output']>;
  uniqueDeviceCount: Scalars['Int']['output'];
};

export type EngagementOverview = {
  __typename?: 'EngagementOverview';
  deviceCategoryPercentages: Scalars['JSON']['output'];
  locations: Array<EngagementLocationOverview>;
  uniqueDeviceIds: Scalars['Int']['output'];
  views: Array<EngagementViewOverview>;
};

export type EngagementOverviewInput = {
  endTime?: InputMaybe<Scalars['DateTimeISO']['input']>;
  startTime?: InputMaybe<Scalars['DateTimeISO']['input']>;
};

export type EngagementViewOverview = {
  __typename?: 'EngagementViewOverview';
  uniqueDeviceCount: Scalars['Int']['output'];
  viewIdentifier?: Maybe<Scalars['String']['output']>;
};

export type EstimateOrderPriceInput = {
  lineItems: Array<OrderLineItemInput>;
  shippingAddress?: InputMaybe<StreetAddressInput>;
};

export type FulfillmentOrder = {
  __typename?: 'FulfillmentOrder';
  createdAt: Scalars['DateTimeISO']['output'];
  emailAddress: Scalars['String']['output'];
  holdOnShipping: Scalars['Boolean']['output'];
  identifier: Scalars['String']['output'];
  lineItems: Array<FulfillmentOrderLineItem>;
  shipments: Array<Shipment>;
  shippingAddress: StreetAddressObject;
};

export type FulfillmentOrderLineItem = {
  __typename?: 'FulfillmentOrderLineItem';
  fulfilledQuantity: Scalars['Int']['output'];
  orderLineItemId: Scalars['String']['output'];
  productVariant: FulfillmentProductVariant;
  productVariantId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  shippedQuantity: Scalars['Int']['output'];
};

export type FulfillmentProductVariant = {
  __typename?: 'FulfillmentProductVariant';
  barcode?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  gtin?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  sku?: Maybe<Scalars['String']['output']>;
};

export type GrantAccessRoleInput = {
  emailAddress: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  type: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type GridClusterUpdateInput = {
  clusterId?: InputMaybe<Scalars['String']['input']>;
  clusterName?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GridNode = {
  __typename?: 'GridNode';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  region: Region;
  regionId: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridNodeCreateInput = {
  clusterName: Scalars['String']['input'];
  displayName?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  ipAddress: Scalars['String']['input'];
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name: Scalars['String']['input'];
  regionName: Scalars['String']['input'];
};

export type GridNodeInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GridNodeUpdateInput = {
  cluster?: InputMaybe<Scalars['String']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  ipAddress?: InputMaybe<Scalars['String']['input']>;
  meta?: InputMaybe<Scalars['JSON']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GridRegionCreateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  displayName: Scalars['String']['input'];
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  identifier: Scalars['String']['input'];
  regionName: Scalars['String']['input'];
};

export type GridRegionUpdateInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  displayName?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  regionId?: InputMaybe<Scalars['String']['input']>;
  regionIdentifier?: InputMaybe<Scalars['String']['input']>;
  regionName?: InputMaybe<Scalars['String']['input']>;
};

export type ImageObject = {
  __typename?: 'ImageObject';
  type: MediaObjectType;
  url: Scalars['String']['output'];
  variant?: Maybe<Scalars['String']['output']>;
};

export enum LengthUnit {
  Centimeter = 'Centimeter',
  Foot = 'Foot',
  Inch = 'Inch',
  Meter = 'Meter'
}

export enum ListEntryAction {
  Add = 'Add',
  Remove = 'Remove',
  Update = 'Update'
}

export type MakePaymentToOrderInput = {
  orderId: Scalars['String']['input'];
  paymentMethod: CreateOrderPaymentMethodInput;
};

export type MediaObject = {
  __typename?: 'MediaObject';
  type: MediaObjectType;
  url: Scalars['String']['output'];
  variant?: Maybe<Scalars['String']['output']>;
};

export enum MediaObjectType {
  File = 'File',
  Image = 'Image',
  Video = 'Video'
}

export type Mutation = {
  __typename?: 'Mutation';
  accountDeleteAdmin: OperationResult;
  accountEmailDelete: OperationResult;
  accountEmailMakePrimary: AccountEmail;
  accountEmailVerificationComplete: AccountEmail;
  accountEmailVerificationSend: EmailVerification;
  accountMaintenanceSessionCreate: AuthenticationSession;
  accountPasswordCreate: OperationResult;
  accountPasswordVerify: AuthenticationOperationResult;
  accountProfileImageRemove: Profile;
  accountProfileUpdate: Profile;
  accountRegistrationComplete: AuthenticationOperationResult;
  accountRegistrationOrSignInCreate: AuthenticationRegistrationOrSignIn;
  accountRoleGrant: AccessRole;
  accountRoleRevoke: OperationResult;
  accountRoleSetExpiration: OperationResult;
  accountSessionDelete: OperationResult;
  accountSignInComplete: AuthenticationOperationResult;
  accountSignOut: OperationResult;
  commerceAddressBookEntryCreate: AddressBookEntry;
  commerceCartUpdate: ShoppingBag;
  commerceCheckoutSessionCancel: OperationResult;
  commerceCheckoutSessionCreate: CommerceCheckoutSession;
  commerceCheckoutSessionRefreshStatus: CommerceCheckoutSession;
  commerceDiscountCreate: Discount;
  commerceDiscountRuleCreate: DiscountRule;
  commerceGenerateManifest: ShipmentManifest;
  commerceMarkOrdersAsShipped: Array<CommerceOrder>;
  commerceMarkShipmentBatchPrinted: ShipmentBatch;
  commerceMarkShipmentBatchReadyToProcess: ShipmentBatch;
  commerceOrderCancel: CommerceOrder;
  commerceOrderCreate: CommerceOrder;
  commerceOrderSetPayment: CommerceOrder;
  commerceProductBundleCreate: ProductBundle;
  commerceProductBundleDelete: OperationResult;
  commerceProductBundleUpdate: ProductBundle;
  commerceProductCreate: Product;
  commerceProductUpdate: Product;
  commercePurchaseLabelForOrders: Scalars['String']['output'];
  commerceSavedItemsUpdate: ShoppingBag;
  commerceShoppingBagCheckout: Array<CommerceOrder>;
  commerceShoppingBagClear: ShoppingBag;
  commerceShoppingBagTransform: TransformShoppingBagResult;
  commerceShoppingBagUpsert: ShoppingBag;
  commerceVendorCreate: Vendor;
  commerceVendorUpdate: Vendor;
  commerceWalletEntryDelete: OperationResult;
  commerceWalletEntryUpsert: WalletEntry;
  contactCreate: Contact;
  contactDelete: Scalars['Boolean']['output'];
  contactFieldUpdate: Contact;
  contactUpdate: Contact;
  dataInteractionDatabaseTableRowCreate: Scalars['JSON']['output'];
  dataInteractionDatabaseTableRowDelete: OperationResult;
  dataInteractionDatabaseTableRowUpdate: Scalars['JSON']['output'];
  dataInteractionDatabaseTableRowsDelete: Scalars['Int']['output'];
  discordWebhookMessageCreate: Scalars['Boolean']['output'];
  emailAutomationUpsert: EmailAutomation;
  emailCampaignCreate: EmailCampaign;
  emailCampaignEditEmailAddresses: EmailCampaign;
  emailCampaignStartStage: EmailCampaign;
  emailCampaignUpdate: EmailCampaign;
  emailCampaignUpdateStatus: EmailCampaign;
  emailContact: Scalars['String']['output'];
  emailListCreate: EmailList;
  emailListUpdate: EmailList;
  emailTemplateContentUpsert: EmailTemplate;
  emailTemplateCreate: EmailTemplate;
  emailTemplateImageAssetDelete: Scalars['Boolean']['output'];
  emailTemplateImageAssetSetDescription: EmailTemplateImageAsset;
  emailTemplatePreview: Scalars['String']['output'];
  emailTemplateUpdate: EmailTemplate;
  emailVerificationSend: AuthenticationEmailVerification;
  emailVerificationVerify: AuthenticationEmailVerification;
  engagementEventCreate: OperationResult;
  engagementEventsCreate: OperationResult;
  /** Update a cluster. */
  gridClusterUpdate?: Maybe<Cluster>;
  /** Create a new node. */
  gridNodeCreate: GridNode;
  /** Update a node. */
  gridNodeUpdate: GridNode;
  /** Create a new region. */
  gridRegionCreate: Region;
  /** Update a region. */
  gridRegionUpdate?: Maybe<Region>;
  postCommentCreate: PostComment;
  postCommentDelete: Scalars['Boolean']['output'];
  postCreateAdmin: Post;
  postDelete: Scalars['String']['output'];
  postDeleteAdmin: Scalars['String']['output'];
  postDraft: Post;
  postPublish: Post;
  postPublishAdmin: Post;
  postReactionCreate: Scalars['Boolean']['output'];
  postReactionDelete: Scalars['Boolean']['output'];
  postReportCreate: PostReport;
  postReportModerate: Post;
  postTopicAssignPost: Scalars['Boolean']['output'];
  postTopicCreate: PostTopic;
  postTopicDelete: Scalars['Boolean']['output'];
  postTopicUpdate: PostTopic;
  postTopicUpdatePosition: PostTopic;
  postUnvote: Scalars['Boolean']['output'];
  postUpdate: Post;
  postUpdateAdmin: Post;
  postVote: Scalars['Boolean']['output'];
  productVariantRemoveGalleryAsset: ProductVariant;
  productVariantReorderGallery: ProductVariant;
  sendEmail: Scalars['String']['output'];
  supportTicketAssign: SupportTicket;
  supportTicketCommentCreateAdmin: SupportTicketComment;
  supportTicketCreate: SupportTicket;
  supportTicketUpdateAdmin: SupportTicket;
  supportTicketUpdateStatusAdmin: SupportTicket;
  taskCreatePortScan: Array<Task>;
  waitListCreate: WaitList;
  waitListDelete: OperationResult;
  waitListEntryCreate: WaitListEntry;
  waitListEntryDelete: OperationResult;
  waitListUpdate: WaitList;
  warehouseCreate: Warehouse;
  warehouseDelete: Scalars['String']['output'];
  warehouseInventoryCreate: WarehouseInventory;
  warehouseInventoryDelete: Scalars['String']['output'];
  warehouseInventoryUpdate: WarehouseInventory;
  warehouseUpdate: Warehouse;
};


export type MutationAccountDeleteAdminArgs = {
  emailAddress: Scalars['String']['input'];
};


export type MutationAccountEmailDeleteArgs = {
  accountEmailId: Scalars['String']['input'];
};


export type MutationAccountEmailMakePrimaryArgs = {
  accountEmailId: Scalars['String']['input'];
};


export type MutationAccountEmailVerificationCompleteArgs = {
  input: AccountEmailVerificationCompleteInput;
};


export type MutationAccountEmailVerificationSendArgs = {
  input: AccountEmailVerificationSendInput;
};


export type MutationAccountPasswordCreateArgs = {
  input: AccountPasswordCreateInput;
};


export type MutationAccountPasswordVerifyArgs = {
  input: AccountPasswordVerifyInput;
};


export type MutationAccountProfileUpdateArgs = {
  input: AccountProfileUpdateInput;
};


export type MutationAccountRegistrationCompleteArgs = {
  input: AccountRegistrationCompleteInput;
};


export type MutationAccountRegistrationOrSignInCreateArgs = {
  input: AccountRegistrationOrSignInCreateInput;
};


export type MutationAccountRoleGrantArgs = {
  input: GrantAccessRoleInput;
};


export type MutationAccountRoleRevokeArgs = {
  roleId: Scalars['String']['input'];
};


export type MutationAccountRoleSetExpirationArgs = {
  expiresAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  roleId: Scalars['String']['input'];
};


export type MutationAccountSessionDeleteArgs = {
  input: AccountSessionDeleteInput;
};


export type MutationCommerceAddressBookEntryCreateArgs = {
  address: StreetAddressInput;
  alias?: InputMaybe<Scalars['String']['input']>;
  tier?: InputMaybe<AddressBookEntryTier>;
};


export type MutationCommerceCartUpdateArgs = {
  items: Array<ShoppingBagItemInput>;
};


export type MutationCommerceCheckoutSessionCancelArgs = {
  id: Scalars['String']['input'];
};


export type MutationCommerceCheckoutSessionCreateArgs = {
  input: CommerceCheckoutSessionCreateInput;
};


export type MutationCommerceCheckoutSessionRefreshStatusArgs = {
  id: Scalars['String']['input'];
};


export type MutationCommerceDiscountCreateArgs = {
  input: CreateDiscountInput;
};


export type MutationCommerceDiscountRuleCreateArgs = {
  input: CreateDiscountRuleInput;
};


export type MutationCommerceGenerateManifestArgs = {
  shipmentIds: Array<Scalars['String']['input']>;
};


export type MutationCommerceMarkOrdersAsShippedArgs = {
  orderIdentifiers: Array<Scalars['String']['input']>;
};


export type MutationCommerceMarkShipmentBatchPrintedArgs = {
  id: Scalars['String']['input'];
};


export type MutationCommerceMarkShipmentBatchReadyToProcessArgs = {
  id: Scalars['String']['input'];
};


export type MutationCommerceOrderCancelArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationCommerceOrderCreateArgs = {
  input: CreateOrderInput;
  paymentRequired?: InputMaybe<Scalars['Boolean']['input']>;
};


export type MutationCommerceOrderSetPaymentArgs = {
  input: MakePaymentToOrderInput;
};


export type MutationCommerceProductBundleCreateArgs = {
  input: CreateProductBundleInput;
};


export type MutationCommerceProductBundleDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationCommerceProductBundleUpdateArgs = {
  input: UpdateProductBundleInput;
};


export type MutationCommerceProductCreateArgs = {
  input: CreateProductInput;
};


export type MutationCommerceProductUpdateArgs = {
  input: UpdateProductInput;
};


export type MutationCommercePurchaseLabelForOrdersArgs = {
  input: PurchaseOrderLabelsInput;
};


export type MutationCommerceSavedItemsUpdateArgs = {
  items: Array<ShoppingBagItemInput>;
};


export type MutationCommerceShoppingBagCheckoutArgs = {
  input: ShoppingBagCheckoutInput;
};


export type MutationCommerceShoppingBagClearArgs = {
  identifier: Scalars['String']['input'];
};


export type MutationCommerceShoppingBagTransformArgs = {
  fromIdentifier: Scalars['String']['input'];
  toIdentifier: Scalars['String']['input'];
};


export type MutationCommerceShoppingBagUpsertArgs = {
  input: UpsertShoppingBagInput;
};


export type MutationCommerceVendorCreateArgs = {
  input: CreateVendorInput;
};


export type MutationCommerceVendorUpdateArgs = {
  input: UpdateVendorInput;
};


export type MutationCommerceWalletEntryDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationCommerceWalletEntryUpsertArgs = {
  input: UpsertWalletEntryInput;
};


export type MutationContactCreateArgs = {
  input: ContactCreateInput;
};


export type MutationContactDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationContactFieldUpdateArgs = {
  contactId: Scalars['String']['input'];
  input: ContactFieldUpdateInput;
};


export type MutationContactUpdateArgs = {
  input: ContactUpdateInput;
};


export type MutationDataInteractionDatabaseTableRowCreateArgs = {
  input: DataInteractionDatabaseTableRowCreateInput;
};


export type MutationDataInteractionDatabaseTableRowDeleteArgs = {
  databaseName: Scalars['String']['input'];
  id: Scalars['String']['input'];
  ignoreOrphantCheck?: InputMaybe<Scalars['Boolean']['input']>;
  tableName: Scalars['String']['input'];
};


export type MutationDataInteractionDatabaseTableRowUpdateArgs = {
  input: DataInteractionDatabaseTableRowUpdateInput;
};


export type MutationDataInteractionDatabaseTableRowsDeleteArgs = {
  databaseName: Scalars['String']['input'];
  ids: Array<Scalars['String']['input']>;
  ignoreOrphantCheck?: InputMaybe<Scalars['Boolean']['input']>;
  tableName: Scalars['String']['input'];
};


export type MutationDiscordWebhookMessageCreateArgs = {
  input: DiscordWebhookMessageCreateInput;
};


export type MutationEmailAutomationUpsertArgs = {
  input: UpsertEmailAutomationInput;
};


export type MutationEmailCampaignCreateArgs = {
  input: EmailCampaignCreateInput;
};


export type MutationEmailCampaignEditEmailAddressesArgs = {
  campaignId: Scalars['String']['input'];
  emailAddressInputs: Array<EmailCampaignEmailAddressUpdateInput>;
};


export type MutationEmailCampaignStartStageArgs = {
  id: Scalars['String']['input'];
};


export type MutationEmailCampaignUpdateArgs = {
  input: EmailCampaignUpdateInput;
};


export type MutationEmailCampaignUpdateStatusArgs = {
  id: Scalars['String']['input'];
  status: EmailCampaignStatus;
};


export type MutationEmailContactArgs = {
  input: EmailContactInput;
};


export type MutationEmailListCreateArgs = {
  input: CreateEmailListInput;
};


export type MutationEmailListUpdateArgs = {
  input: UpdateEmailListInput;
};


export type MutationEmailTemplateContentUpsertArgs = {
  data: UpsertEmailTemplateContentInput;
};


export type MutationEmailTemplateCreateArgs = {
  data: CreateEmailTemplateInput;
};


export type MutationEmailTemplateImageAssetDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationEmailTemplateImageAssetSetDescriptionArgs = {
  description: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationEmailTemplatePreviewArgs = {
  input: PreviewEmailTemplateInput;
};


export type MutationEmailTemplateUpdateArgs = {
  data: UpdateEmailTemplateInput;
};


export type MutationEmailVerificationVerifyArgs = {
  input: EmailVerificationVerifyInput;
};


export type MutationEngagementEventCreateArgs = {
  input: CreateEngagementEventInput;
};


export type MutationEngagementEventsCreateArgs = {
  inputs: Array<CreateEngagementEventInput>;
};


export type MutationGridClusterUpdateArgs = {
  input: GridClusterUpdateInput;
};


export type MutationGridNodeCreateArgs = {
  input: GridNodeCreateInput;
};


export type MutationGridNodeUpdateArgs = {
  input: GridNodeUpdateInput;
};


export type MutationGridRegionCreateArgs = {
  input: GridRegionCreateInput;
};


export type MutationGridRegionUpdateArgs = {
  input: GridRegionUpdateInput;
};


export type MutationPostCommentCreateArgs = {
  input: PostCommentCreateInput;
};


export type MutationPostCommentDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostCreateAdminArgs = {
  input: PostCreateInput;
};


export type MutationPostDeleteArgs = {
  id: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPostDeleteAdminArgs = {
  id: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPostDraftArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostPublishArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostPublishAdminArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostReactionCreateArgs = {
  commentId?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPostReactionDeleteArgs = {
  commentId?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPostReportCreateArgs = {
  input: PostReportInput;
};


export type MutationPostReportModerateArgs = {
  approval: Scalars['Boolean']['input'];
  id: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPostTopicAssignPostArgs = {
  assign: Scalars['Boolean']['input'];
  postId: Scalars['String']['input'];
  topicId: Scalars['String']['input'];
};


export type MutationPostTopicCreateArgs = {
  input: PostTopicCreateInput;
};


export type MutationPostTopicDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostTopicUpdateArgs = {
  input: PostTopicUpdateInput;
};


export type MutationPostTopicUpdatePositionArgs = {
  id: Scalars['String']['input'];
  input: PostTopicUpdatePositionInput;
};


export type MutationPostUnvoteArgs = {
  commentId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PostVoteType>;
};


export type MutationPostUpdateArgs = {
  id: Scalars['String']['input'];
  input: PostUpdateInput;
};


export type MutationPostUpdateAdminArgs = {
  id: Scalars['String']['input'];
  input: PostUpdateInput;
};


export type MutationPostVoteArgs = {
  commentId?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<PostVoteType>;
};


export type MutationProductVariantRemoveGalleryAssetArgs = {
  assetId: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationProductVariantReorderGalleryArgs = {
  assetIds: Array<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};


export type MutationSendEmailArgs = {
  data: SendEmailInput;
};


export type MutationSupportTicketAssignArgs = {
  ticketId: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSupportTicketCommentCreateAdminArgs = {
  input: SupportTicketCommentCreateInput;
};


export type MutationSupportTicketCreateArgs = {
  input: SupportTicketCreateInput;
};


export type MutationSupportTicketUpdateAdminArgs = {
  input: SupportTicketUpdateInput;
};


export type MutationSupportTicketUpdateStatusAdminArgs = {
  id: Scalars['String']['input'];
  status: SupportTicketStatus;
};


export type MutationTaskCreatePortScanArgs = {
  input: TaskPortScanInput;
};


export type MutationWaitListCreateArgs = {
  data: WaitListCreationInput;
};


export type MutationWaitListDeleteArgs = {
  forceDelete?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
};


export type MutationWaitListEntryCreateArgs = {
  emailAddress: Scalars['String']['input'];
  waitListIdentifier: Scalars['String']['input'];
};


export type MutationWaitListEntryDeleteArgs = {
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  waitListIdentifier?: InputMaybe<Scalars['String']['input']>;
};


export type MutationWaitListUpdateArgs = {
  data: WaitListUpdateInput;
};


export type MutationWarehouseCreateArgs = {
  input: WarehouseCreateInput;
};


export type MutationWarehouseDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationWarehouseInventoryCreateArgs = {
  input: WarehouseInventoryCreateInput;
};


export type MutationWarehouseInventoryDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationWarehouseInventoryUpdateArgs = {
  input: WarehouseInventoryUpdateInput;
};


export type MutationWarehouseUpdateArgs = {
  input: WarehouseUpdateInput;
};

export type OperationResult = {
  __typename?: 'OperationResult';
  success: Scalars['Boolean']['output'];
};

export type OrderBy = {
  direction?: InputMaybe<OrderByDirection>;
  key: Scalars['String']['input'];
};

/** The order direction of a query */
export enum OrderByDirection {
  Ascending = 'Ascending',
  Descending = 'Descending'
}

export type OrderLineItemInput = {
  indexId: Scalars['Int']['input'];
  productVariantId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type PagedAccountAdminQueryObject = {
  __typename?: 'PagedAccountAdminQueryObject';
  items: Array<AccountAdminQueryObject>;
  pagination?: Maybe<Pagination>;
};

export type PagedContactResult = {
  __typename?: 'PagedContactResult';
  items: Array<Contact>;
  pagination?: Maybe<Pagination>;
};

export type PagedDatabasesResult = {
  __typename?: 'PagedDatabasesResult';
  items: Array<DatebaseMetadata>;
  pagination?: Maybe<Pagination>;
};

export type PagedEmailCampaignEmailAddress = {
  __typename?: 'PagedEmailCampaignEmailAddress';
  items: Array<EmailCampaignEmailAddress>;
  pagination?: Maybe<Pagination>;
};

export type PagedEmailCampaigns = {
  __typename?: 'PagedEmailCampaigns';
  items: Array<EmailCampaign>;
  pagination?: Maybe<Pagination>;
};

export type PagedEmailListEntries = {
  __typename?: 'PagedEmailListEntries';
  items: Array<EmailListEntry>;
  pagination?: Maybe<Pagination>;
};

export type PagedEmailLists = {
  __typename?: 'PagedEmailLists';
  items: Array<EmailList>;
  pagination?: Maybe<Pagination>;
};

export type PagedPostComments = {
  __typename?: 'PagedPostComments';
  items: Array<PostComment>;
  pagination?: Maybe<Pagination>;
};

export type PagedPostReactionProfile = {
  __typename?: 'PagedPostReactionProfile';
  items: Array<PostReactionProfile>;
  pagination?: Maybe<Pagination>;
};

export type PagedPostReports = {
  __typename?: 'PagedPostReports';
  items: Array<PostReport>;
  pagination?: Maybe<Pagination>;
};

export type PagedPostRevisions = {
  __typename?: 'PagedPostRevisions';
  items: Array<PostRevision>;
  pagination?: Maybe<Pagination>;
};

export type PagedPosts = {
  __typename?: 'PagedPosts';
  items: Array<Post>;
  pagination?: Maybe<Pagination>;
};

export type Pagination = {
  __typename?: 'Pagination';
  itemIndex: Scalars['Int']['output'];
  itemIndexForNextPage?: Maybe<Scalars['Int']['output']>;
  itemIndexForPreviousPage?: Maybe<Scalars['Int']['output']>;
  itemsPerPage: Scalars['Int']['output'];
  itemsTotal: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  pagesTotal: Scalars['Int']['output'];
};

export type PaginationDiscountResult = {
  __typename?: 'PaginationDiscountResult';
  items: Array<Discount>;
  pagination?: Maybe<Pagination>;
};

export type PaginationDiscountRuleResult = {
  __typename?: 'PaginationDiscountRuleResult';
  items: Array<DiscountRule>;
  pagination?: Maybe<Pagination>;
};

export type PaginationFulfillmentOrderResult = {
  __typename?: 'PaginationFulfillmentOrderResult';
  items: Array<FulfillmentOrder>;
  pagination?: Maybe<Pagination>;
};

export type PaginationInput = {
  itemIndex?: InputMaybe<Scalars['Int']['input']>;
  itemsPerPage: Scalars['Int']['input'];
};

export type PaginationInputWithFilters = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  itemIndex?: InputMaybe<Scalars['Int']['input']>;
  itemsPerPage: Scalars['Int']['input'];
};

export type PaginationOrderResult = {
  __typename?: 'PaginationOrderResult';
  items: Array<CommerceOrder>;
  pagination?: Maybe<Pagination>;
};

export type PaginationShipmentBatchResult = {
  __typename?: 'PaginationShipmentBatchResult';
  items: Array<ShipmentBatch>;
  pagination?: Maybe<Pagination>;
};

export type PaginationSupportTicketResult = {
  __typename?: 'PaginationSupportTicketResult';
  items: Array<SupportTicket>;
  pagination?: Maybe<Pagination>;
};

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['MonetaryDecimal']['output'];
  authorizedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  cancelledAt?: Maybe<Scalars['DateTimeISO']['output']>;
  capturedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  confirmedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  currencyCode: Scalars['String']['output'];
  externalReferenceId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  paymentMethod?: Maybe<PaymentMethod>;
  paymentProcessorType: PaymentProcessorType;
  status: PaymentStatus;
  statusDescription?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  walletEntryId?: Maybe<Scalars['String']['output']>;
};

export type PaymentMethod = {
  externalResourceId?: Maybe<Scalars['String']['output']>;
  paymentProcessorType: PaymentProcessorType;
  type: PaymentMethodType;
};

export type PaymentMethodAppleInAppPurchase = PaymentMethod & {
  __typename?: 'PaymentMethodAppleInAppPurchase';
  externalResourceId?: Maybe<Scalars['String']['output']>;
  paymentProcessorType: PaymentProcessorType;
  type: PaymentMethodType;
};

export type PaymentMethodCreditCard = PaymentMethod & {
  __typename?: 'PaymentMethodCreditCard';
  billingAddress: StreetAddressObject;
  cardType: CreditCardType;
  expirationMonth: Scalars['Int']['output'];
  expirationYear: Scalars['Int']['output'];
  externalResourceId?: Maybe<Scalars['String']['output']>;
  last4: Scalars['String']['output'];
  paymentProcessorType: PaymentProcessorType;
  type: PaymentMethodType;
};

export type PaymentMethodInput = {
  creditCard?: InputMaybe<PaymentMethodInputCreditCard>;
  paymentProcessorType: PaymentProcessorType;
  type: PaymentMethodType;
};

export type PaymentMethodInputCreditCard = {
  billingAddress: StreetAddressInput;
  cardNumber: Scalars['String']['input'];
  cardholderName: Scalars['String']['input'];
  cvc: Scalars['String']['input'];
  expirationMonth: Scalars['Int']['input'];
  expirationYear: Scalars['Int']['input'];
};

export enum PaymentMethodType {
  AppleInAppPurchase = 'AppleInAppPurchase',
  CreditCard = 'CreditCard'
}

export enum PaymentProcessorType {
  AppleInAppPurchase = 'AppleInAppPurchase',
  StripeEmbedded = 'StripeEmbedded',
  StripeProxy = 'StripeProxy'
}

/** The status of the payment */
export enum PaymentStatus {
  Authorized = 'Authorized',
  Cancelled = 'Cancelled',
  Captured = 'Captured',
  Confirmed = 'Confirmed',
  FailToAuthorize = 'FailToAuthorize',
  Pending = 'Pending'
}

export type Post = {
  __typename?: 'Post';
  commentsPaged?: Maybe<PagedPostComments>;
  content?: Maybe<Scalars['String']['output']>;
  contentType: RichContentFormat;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfile?: Maybe<PublicProfile>;
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  downvoteCount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  latestRevisionId?: Maybe<Scalars['String']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  reactions?: Maybe<Array<PostReaction>>;
  reportStatus?: Maybe<PostReportStatus>;
  reportedCount: Scalars['Int']['output'];
  revisionsPaged?: Maybe<PagedPostRevisions>;
  settings?: Maybe<Scalars['JSON']['output']>;
  slug: Scalars['String']['output'];
  status: PostStatus;
  title: Scalars['String']['output'];
  topics?: Maybe<Array<PostTopic>>;
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
  upvoteCount: Scalars['Int']['output'];
  voteType?: Maybe<PostVoteType>;
};


export type PostRevisionsPagedArgs = {
  input: PaginationInput;
};

export type PostComment = {
  __typename?: 'PostComment';
  content: Scalars['String']['output'];
  contentType: RichContentFormat;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfile?: Maybe<PublicProfile>;
  createdByProfileId: Scalars['String']['output'];
  deleted: Scalars['Boolean']['output'];
  downvoteCount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  postId: Scalars['String']['output'];
  reactions?: Maybe<Array<PostReaction>>;
  replyToCommentId?: Maybe<Scalars['String']['output']>;
  reportStatus?: Maybe<PostReportStatus>;
  reportedCount: Scalars['Int']['output'];
  threadId?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
  upvoteCount: Scalars['Int']['output'];
  voteType?: Maybe<PostVoteType>;
};

export type PostCommentCreateInput = {
  content: Scalars['String']['input'];
  contentType?: InputMaybe<RichContentFormat>;
  postId: Scalars['String']['input'];
  replyToCommentId?: InputMaybe<Scalars['String']['input']>;
};

export type PostCreateInput = {
  allowComment?: InputMaybe<Scalars['Boolean']['input']>;
  allowDownvote?: InputMaybe<Scalars['Boolean']['input']>;
  allowReaction?: InputMaybe<Scalars['Boolean']['input']>;
  allowVote?: InputMaybe<Scalars['Boolean']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<RichContentFormat>;
  description?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  slug: Scalars['String']['input'];
  status?: InputMaybe<PostStatus>;
  title: Scalars['String']['input'];
  topicIds?: InputMaybe<Array<Scalars['String']['input']>>;
  type: Scalars['String']['input'];
};

export type PostReaction = {
  __typename?: 'PostReaction';
  content: Scalars['String']['output'];
  count: Scalars['Int']['output'];
  reacted: Scalars['Boolean']['output'];
};

export type PostReactionProfile = {
  __typename?: 'PostReactionProfile';
  displayName?: Maybe<Scalars['String']['output']>;
  profileId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type PostReport = {
  __typename?: 'PostReport';
  commentId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  postId?: Maybe<Scalars['String']['output']>;
  reason: Scalars['String']['output'];
};

export type PostReportInput = {
  commentId?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  postId?: InputMaybe<Scalars['String']['input']>;
  reason: Scalars['String']['input'];
};

export enum PostReportStatus {
  Approved = 'Approved',
  HoldForReview = 'HoldForReview',
  Rejected = 'Rejected'
}

export type PostRevision = {
  __typename?: 'PostRevision';
  content?: Maybe<Scalars['String']['output']>;
  contentType?: Maybe<RichContentFormat>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  postId: Scalars['String']['output'];
  settings?: Maybe<Scalars['JSON']['output']>;
  slug?: Maybe<Scalars['String']['output']>;
  status?: Maybe<PostStatus>;
  title?: Maybe<Scalars['String']['output']>;
  topicId?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export enum PostStatus {
  Deleted = 'Deleted',
  Draft = 'Draft',
  Published = 'Published'
}

export type PostTopic = {
  __typename?: 'PostTopic';
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  nextSiblingId?: Maybe<Scalars['String']['output']>;
  postCount: Scalars['Int']['output'];
  previousSiblingId?: Maybe<Scalars['String']['output']>;
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type PostTopicCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Float']['input']>;
  slug: Scalars['String']['input'];
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type PostTopicQueryResult = {
  __typename?: 'PostTopicQueryResult';
  pagedPosts: PagedPosts;
  subTopics?: Maybe<Array<PostTopic>>;
  topic: PostTopic;
};

export type PostTopicUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type PostTopicUpdatePositionInput = {
  moveToRoot?: InputMaybe<Scalars['Boolean']['input']>;
  parentId?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Float']['input']>;
};

export type PostUpdateInput = {
  allowComment?: InputMaybe<Scalars['Boolean']['input']>;
  allowDownvote?: InputMaybe<Scalars['Boolean']['input']>;
  allowReaction?: InputMaybe<Scalars['Boolean']['input']>;
  allowVote?: InputMaybe<Scalars['Boolean']['input']>;
  content?: InputMaybe<Scalars['String']['input']>;
  contentType?: InputMaybe<RichContentFormat>;
  description?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  publishedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export enum PostVoteType {
  Downvote = 'Downvote',
  Upvote = 'Upvote'
}

export type PreviewEmailTemplateInput = {
  contentId?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  languageCode: Scalars['String']['input'];
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  toAddress: Scalars['String']['input'];
  withEngagement?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Product = {
  __typename?: 'Product';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  defaultVariantId?: Maybe<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: ProductStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
  variants?: Maybe<Array<ProductVariant>>;
  vendor?: Maybe<Vendor>;
  vendorId?: Maybe<Scalars['String']['output']>;
};

export type ProductBundle = {
  __typename?: 'ProductBundle';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  items: Array<ProductBundleItem>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
  visibility: ProductBundleVisibility;
};

export type ProductBundleItem = {
  __typename?: 'ProductBundleItem';
  indexId: Scalars['String']['output'];
  productVariant?: Maybe<ProductVariant>;
  productVariantId: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
};

export enum ProductBundleVisibility {
  Public = 'Public',
  Unlisted = 'Unlisted'
}

export type ProductBundlesPaginationResult = {
  __typename?: 'ProductBundlesPaginationResult';
  items: Array<ProductBundle>;
  pagination?: Maybe<Pagination>;
};

export enum ProductStatus {
  Active = 'Active',
  Archived = 'Archived',
  Draft = 'Draft'
}

export type ProductVariant = {
  __typename?: 'ProductVariant';
  attributes?: Maybe<Array<ProductVariantAttributeObject>>;
  barcode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  galleryUrls?: Maybe<Array<ProductVariantGalleryUrl>>;
  gtin?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  inventoryPolicy: ProductVariantInventoryPolicy;
  isVirtual: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  position?: Maybe<Scalars['Float']['output']>;
  price: ProductVariantPriceObject;
  sku?: Maybe<Scalars['String']['output']>;
  status: ProductVariantStatus;
  taxCode?: Maybe<Scalars['String']['output']>;
  unitInfo?: Maybe<ProductVariantUnitInfoObject>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type ProductVariantAttributeInput = {
  displayName: Scalars['String']['input'];
  key: ProductVariantAttributeKey;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  value: Scalars['String']['input'];
};

export enum ProductVariantAttributeKey {
  AppStore = 'AppStore',
  Color = 'Color',
  Credits = 'Credits',
  Size = 'Size',
  SubscriptionPlan = 'SubscriptionPlan'
}

export type ProductVariantAttributeObject = {
  __typename?: 'ProductVariantAttributeObject';
  createdAt: Scalars['DateTimeISO']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  key: ProductVariantAttributeKey;
  metadata?: Maybe<Scalars['JSON']['output']>;
  value: Scalars['String']['output'];
};

export type ProductVariantGalleryUrl = {
  __typename?: 'ProductVariantGalleryURL';
  variants: Array<MediaObject>;
};

/** Whether customers are allowed to place an order for the product variant when it's out of stock. */
export enum ProductVariantInventoryPolicy {
  AllowBackorder = 'AllowBackorder',
  AllowWaitlist = 'AllowWaitlist',
  Deny = 'Deny'
}

export type ProductVariantPriceInput = {
  amount: Scalars['MonetaryDecimal']['input'];
  currencyCode: Scalars['String']['input'];
};

export type ProductVariantPriceObject = {
  __typename?: 'ProductVariantPriceObject';
  amount: Scalars['MonetaryDecimal']['output'];
  currencyCode: Scalars['String']['output'];
};

/** The status of the product variant. */
export enum ProductVariantStatus {
  Active = 'Active',
  Archived = 'Archived',
  Draft = 'Draft'
}

export type ProductVariantUnitInfoInput = {
  height?: InputMaybe<Scalars['Float']['input']>;
  heightUnit?: InputMaybe<LengthUnit>;
  length?: InputMaybe<Scalars['Float']['input']>;
  lengthUnit?: InputMaybe<LengthUnit>;
  weight?: InputMaybe<Scalars['Float']['input']>;
  weightUnit?: InputMaybe<WeightUnit>;
  width?: InputMaybe<Scalars['Float']['input']>;
  widthUnit?: InputMaybe<LengthUnit>;
};

export type ProductVariantUnitInfoObject = {
  __typename?: 'ProductVariantUnitInfoObject';
  height?: Maybe<Scalars['Float']['output']>;
  heightUnit?: Maybe<LengthUnit>;
  length?: Maybe<Scalars['Float']['output']>;
  lengthUnit?: Maybe<LengthUnit>;
  weight?: Maybe<Scalars['Float']['output']>;
  weightUnit?: Maybe<WeightUnit>;
  width?: Maybe<Scalars['Float']['output']>;
  widthUnit?: Maybe<LengthUnit>;
};

export type ProductsPaginationResult = {
  __typename?: 'ProductsPaginationResult';
  items: Array<Product>;
  pagination?: Maybe<Pagination>;
};

export type Profile = {
  __typename?: 'Profile';
  birthday?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  familyName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  imageUrls?: Maybe<Array<ImageObject>>;
  middleName?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  preferredName?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  username: Scalars['String']['output'];
};

export type PublicCommerceOrder = {
  __typename?: 'PublicCommerceOrder';
  batchIdentifier: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  fulfillmentStatus: CommerceOrderFulfillmentStatus;
  identifier: Scalars['String']['output'];
  lineItems?: Maybe<Array<PublicCommerceOrderLineItem>>;
  paymentStatus?: Maybe<PaymentStatus>;
  source: Scalars['String']['output'];
  status: CommerceOrderStatus;
};

export type PublicCommerceOrderLineItem = {
  __typename?: 'PublicCommerceOrderLineItem';
  fulfilledQuantity: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  indexId: Scalars['Int']['output'];
  productVariantId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  shippedQuantity: Scalars['Int']['output'];
  status: CommerceOrderLineItemStatus;
};

export type PublicProfile = {
  __typename?: 'PublicProfile';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  imageUrls?: Maybe<Array<ImageObject>>;
  username: Scalars['String']['output'];
};

export type PurchaseOrderLabelsInput = {
  identifiers: Array<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  accountAssignableRoles: Array<Scalars['String']['output']>;
  accountByEmailAddressAdmin: AccountAdminQueryObject;
  accountCurrent: Account;
  accountEmailAddresses: AccountEmailAddressesResult;
  accountEmailVerification: EmailVerification;
  accountProfileUsernameValidate: UniqueFieldValidationResult;
  accountRoles: Array<AccessRole>;
  accountSessions: Array<AccountSession>;
  accountsAdmin: PagedAccountAdminQueryObject;
  appleStoreTransactionWithOrderInfo?: Maybe<AppleStoreTransactionOrderMapping>;
  authenticationCurrent?: Maybe<AuthenticationSession>;
  commerceAddressBookEntries: Array<AddressBookEntry>;
  commerceCart: ShoppingBag;
  commerceCheckoutSession: CommerceCheckoutSession;
  commerceCheckoutSessionLatest: CommerceCheckoutSession;
  commerceDiscountRules: PaginationDiscountRuleResult;
  commerceDiscounts: PaginationDiscountResult;
  commerceOrder: CommerceOrderResult;
  commerceOrderAdmin: CommerceOrder;
  commerceOrderPriceEstimate: CommerceOrderPrice;
  commerceOrders: PaginationOrderResult;
  commerceOrdersAdmin: PaginationOrderResult;
  commerceOrdersByGroupIdentifier: Array<CommerceOrderResult>;
  commerceOrdersReadyToFulfill: PaginationFulfillmentOrderResult;
  commerceOrdersReadyToShip: PaginationFulfillmentOrderResult;
  commerceProduct: Product;
  commerceProductAdmin: Product;
  commerceProductBundle: ProductBundle;
  commerceProductBundles: ProductBundlesPaginationResult;
  commerceProducts: ProductsPaginationResult;
  commerceProductsAdmin: ProductsPaginationResult;
  commerceSavedItems: ShoppingBag;
  commerceShipmentBatches: PaginationShipmentBatchResult;
  commerceShoppingBag: ShoppingBag;
  commerceShoppingBagPriceEstimate: Array<CommerceOrderPrice>;
  commerceStreetAddressValidate: ValidateAddressResult;
  commerceTaxRate: TaxRate;
  commerceTaxRates: TaxRatesResult;
  commerceVendor: Vendor;
  commerceVendors: VendorsResult;
  commerceWalletEntries: Array<WalletEntry>;
  contact: Contact;
  contacts: PagedContactResult;
  dataInteractionDatabaseTable: DatabaseTableMetadata;
  dataInteractionDatabaseTableMetrics: Array<DataInteractionDatabaseMetrics>;
  dataInteractionDatabaseTableRow: DatabaseTableRowData;
  dataInteractionDatabaseTableRows: DatabaseTableMetadata;
  dataInteractionDatabaseTables: DatabaseTablesResult;
  dataInteractionDatabases: PagedDatabasesResult;
  discordWebhookQuery: Scalars['Boolean']['output'];
  emailAutomation: EmailAutomation;
  emailAutomationBuiltInAvailable: Array<EmailAutomation>;
  emailAutomations: EmailAutomationResult;
  emailCampaign: EmailCampaign;
  emailCampaigns: PagedEmailCampaigns;
  emailList: EmailList;
  emailListEntries: PagedEmailLists;
  emailListEntry: EmailList;
  emailLists: PagedEmailLists;
  emailTemplate: EmailTemplate;
  emailTemplateContentEngagementMetrics: EmailTemplateContentEngagementMetrics;
  emailTemplateImageAssets: EmailTemplateImageAssetsResult;
  emailTemplates: EmailTemplatesResult;
  emailVerification?: Maybe<AuthenticationEmailVerification>;
  engagementEvents: Array<EngagementEvent>;
  engagementOverview: EngagementOverview;
  /** Get a node. */
  gridNode?: Maybe<GridNode>;
  /** Generate a new key for a node. */
  gridNodeGenerateKey: Scalars['String']['output'];
  /** Get all active regions. */
  gridRegions: Array<Region>;
  post: Post;
  postAdmin: Post;
  postComments: PagedPostComments;
  postReactionProfiles: PagedPostReactionProfile;
  postReports: PagedPostReports;
  postTopic: PostTopicQueryResult;
  postTopicById: PostTopic;
  postTopics: Array<PostTopic>;
  posts: PagedPosts;
  postsAdmin: PagedPosts;
  postsByTopic: PagedPosts;
  postsMine: PagedPosts;
  profilePublic?: Maybe<PublicProfile>;
  supportAllSupportProfiles: Array<PublicProfile>;
  supportTickets: PaginationSupportTicketResult;
  supportTicketsAdmin: PaginationSupportTicketResult;
  task?: Maybe<Task>;
  taskGroup: Array<Task>;
  waitListEntries: WaitListEntriesResult;
  waitLists: WaitListResult;
  warehouse: Warehouse;
  warehouses: Array<Warehouse>;
};


export type QueryAccountByEmailAddressAdminArgs = {
  emailAddress: Scalars['String']['input'];
};


export type QueryAccountProfileUsernameValidateArgs = {
  username: Scalars['String']['input'];
};


export type QueryAccountRolesArgs = {
  orderBy?: InputMaybe<OrderBy>;
  statuses?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryAccountsAdminArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryAppleStoreTransactionWithOrderInfoArgs = {
  transactionId: Scalars['String']['input'];
};


export type QueryCommerceCheckoutSessionArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommerceDiscountRulesArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryCommerceDiscountsArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryCommerceOrderArgs = {
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  identifier: Scalars['String']['input'];
};


export type QueryCommerceOrderAdminArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommerceOrderPriceEstimateArgs = {
  input: EstimateOrderPriceInput;
};


export type QueryCommerceOrdersArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryCommerceOrdersAdminArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
  orderBy?: InputMaybe<OrderBy>;
};


export type QueryCommerceOrdersByGroupIdentifierArgs = {
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  identifier: Scalars['String']['input'];
};


export type QueryCommerceOrdersReadyToFulfillArgs = {
  input?: InputMaybe<PaginationInput>;
};


export type QueryCommerceOrdersReadyToShipArgs = {
  input?: InputMaybe<PaginationInput>;
};


export type QueryCommerceProductArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommerceProductAdminArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommerceProductBundleArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommerceProductBundlesArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryCommerceProductsArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryCommerceProductsAdminArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryCommerceShipmentBatchesArgs = {
  input: QueryShipmentBatchInput;
};


export type QueryCommerceShoppingBagArgs = {
  createIfNotExists?: InputMaybe<Scalars['Boolean']['input']>;
  identifier: Scalars['String']['input'];
};


export type QueryCommerceShoppingBagPriceEstimateArgs = {
  itemIds: Array<Scalars['String']['input']>;
};


export type QueryCommerceStreetAddressValidateArgs = {
  address: StreetAddressInput;
};


export type QueryCommerceTaxRateArgs = {
  postalCode: Scalars['String']['input'];
  syncRemote?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryCommerceTaxRatesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryCommerceVendorArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommerceVendorsArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryContactArgs = {
  id: Scalars['String']['input'];
};


export type QueryContactsArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryDataInteractionDatabaseTableArgs = {
  databaseName: Scalars['String']['input'];
  tableName: Scalars['String']['input'];
};


export type QueryDataInteractionDatabaseTableMetricsArgs = {
  input: DataInteractionDatabaseTableMetricsQueryInput;
};


export type QueryDataInteractionDatabaseTableRowArgs = {
  databaseName: Scalars['String']['input'];
  id: Scalars['String']['input'];
  tableName: Scalars['String']['input'];
};


export type QueryDataInteractionDatabaseTableRowsArgs = {
  databaseName: Scalars['String']['input'];
  filters?: InputMaybe<ColumnFilterGroup>;
  orderBy?: InputMaybe<OrderBy>;
  pagination?: InputMaybe<PaginationInput>;
  tableName: Scalars['String']['input'];
};


export type QueryDataInteractionDatabaseTablesArgs = {
  databaseName?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryDataInteractionDatabasesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryEmailAutomationArgs = {
  automationKey: Scalars['String']['input'];
};


export type QueryEmailAutomationsArgs = {
  input?: InputMaybe<PaginationInput>;
};


export type QueryEmailCampaignArgs = {
  id: Scalars['String']['input'];
};


export type QueryEmailCampaignsArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryEmailListArgs = {
  identifier: Scalars['String']['input'];
};


export type QueryEmailListEntriesArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryEmailListEntryArgs = {
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  hashCode?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEmailListsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryEmailTemplateArgs = {
  alias?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};


export type QueryEmailTemplateContentEngagementMetricsArgs = {
  emailTemplateContentId: Scalars['String']['input'];
};


export type QueryEmailTemplateImageAssetsArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryEmailTemplatesArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryEngagementOverviewArgs = {
  input?: InputMaybe<EngagementOverviewInput>;
  live?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGridNodeArgs = {
  input: GridNodeInput;
};


export type QueryGridNodeGenerateKeyArgs = {
  input: GridNodeInput;
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostAdminArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostCommentsArgs = {
  input?: InputMaybe<PaginationInput>;
  orderBy?: InputMaybe<OrderBy>;
  postId: Scalars['String']['input'];
  threadId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostReactionProfilesArgs = {
  commentId?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostReportsArgs = {
  commentId?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostTopicArgs = {
  pagination?: InputMaybe<PaginationInput>;
  path?: InputMaybe<Scalars['String']['input']>;
  slug: Scalars['String']['input'];
  type: Scalars['String']['input'];
};


export type QueryPostTopicByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryPostTopicsArgs = {
  ids?: InputMaybe<Array<Scalars['String']['input']>>;
};


export type QueryPostsArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
  orderBy?: InputMaybe<OrderBy>;
};


export type QueryPostsAdminArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
  orderBy?: InputMaybe<OrderBy>;
};


export type QueryPostsByTopicArgs = {
  id: Scalars['String']['input'];
  orderBy?: InputMaybe<OrderBy>;
  pagination?: InputMaybe<PaginationInput>;
};


export type QueryPostsMineArgs = {
  input?: InputMaybe<PaginationInputWithFilters>;
  orderBy?: InputMaybe<OrderBy>;
};


export type QueryProfilePublicArgs = {
  username: Scalars['String']['input'];
};


export type QuerySupportTicketsArgs = {
  pagination?: InputMaybe<PaginationInput>;
};


export type QuerySupportTicketsAdminArgs = {
  orderBy?: InputMaybe<OrderBy>;
  pagination?: InputMaybe<PaginationInputWithFilters>;
};


export type QueryTaskArgs = {
  input: TaskInput;
};


export type QueryTaskGroupArgs = {
  input: TaskGroupInput;
};


export type QueryWaitListEntriesArgs = {
  input?: InputMaybe<QueryWaitListEntriesInput>;
};


export type QueryWaitListsArgs = {
  input?: InputMaybe<PaginationInput>;
};


export type QueryWarehouseArgs = {
  id: Scalars['String']['input'];
};

export type QueryShipmentBatchInput = {
  endAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  itemIndex?: InputMaybe<Scalars['Int']['input']>;
  itemsPerPage: Scalars['Int']['input'];
  startAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type QueryWaitListEntriesInput = {
  dateColumn?: InputMaybe<Scalars['String']['input']>;
  endDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  itemIndex?: InputMaybe<Scalars['Int']['input']>;
  itemsPerPage: Scalars['Int']['input'];
  startDate?: InputMaybe<Scalars['DateTimeISO']['input']>;
  waitListId?: InputMaybe<Scalars['String']['input']>;
  waitListIdentifier?: InputMaybe<Scalars['String']['input']>;
};

export type Region = {
  __typename?: 'Region';
  active: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  displayName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** The format of the string rich-content */
export enum RichContentFormat {
  Html = 'Html',
  Markdown = 'Markdown',
  PlainText = 'PlainText'
}

export type SendEmailInput = {
  content: Scalars['String']['input'];
  contentFormat?: InputMaybe<EmailContentFormat>;
  fromAddress: Scalars['String']['input'];
  fromName?: InputMaybe<Scalars['String']['input']>;
  subject: Scalars['String']['input'];
  toAddress: Scalars['String']['input'];
};

export type Shipment = {
  __typename?: 'Shipment';
  cancelledAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId?: Maybe<Scalars['String']['output']>;
  createdByProfileId?: Maybe<Scalars['String']['output']>;
  deliveredAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deliveryStatus: DeliveryStatus;
  id: Scalars['String']['output'];
  label?: Maybe<ShippingLabel>;
  orderIndexId: Scalars['Int']['output'];
  orderSlip?: Maybe<ShippingOrderSlip>;
  shippedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  source: Scalars['String']['output'];
  status: ShipmentStatus;
  statusDescription?: Maybe<Scalars['String']['output']>;
  toAddress: StreetAddressObject;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type ShipmentBatch = {
  __typename?: 'ShipmentBatch';
  batchKey: Scalars['String']['output'];
  closedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  printedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  processedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  shipmentCount: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  statusDescription?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type ShipmentManifest = {
  __typename?: 'ShipmentManifest';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
};

/** The status of the shipping */
export enum ShipmentStatus {
  Cancelled = 'Cancelled',
  Delivered = 'Delivered',
  LabelPrinted = 'LabelPrinted',
  LabelPurchased = 'LabelPurchased',
  Pending = 'Pending',
  Shipped = 'Shipped'
}

export type ShippingLabel = {
  __typename?: 'ShippingLabel';
  carrier: Scalars['String']['output'];
  labelId: Scalars['String']['output'];
  serviceType: ShippingServiceType;
  source: ShippingLabelSource;
  trackingNumber: Scalars['String']['output'];
  trackingUrl?: Maybe<Scalars['String']['output']>;
};

export enum ShippingLabelSource {
  Others = 'Others',
  Stamps = 'Stamps'
}

export type ShippingOrderSlip = {
  __typename?: 'ShippingOrderSlip';
  storedObjectUrl?: Maybe<Scalars['String']['output']>;
};

export enum ShippingServiceType {
  UspsFirstClassMail = 'USPSFirstClassMail',
  UspsMediaMail = 'USPSMediaMail',
  UspsParcelSelect = 'USPSParcelSelect',
  UspsPriorityMail = 'USPSPriorityMail',
  UspsPriorityMailExpress = 'USPSPriorityMailExpress'
}

export type ShoppingBag = {
  __typename?: 'ShoppingBag';
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  items: Array<ShoppingBagItem>;
  profileId: Scalars['String']['output'];
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type ShoppingBagCheckoutInput = {
  emailAddress: Scalars['String']['input'];
  itemIds: Array<Scalars['String']['input']>;
  paymentMethod: CreateOrderPaymentMethodInput;
};

/** The action to perform on the shopping bag item */
export enum ShoppingBagEditionAction {
  AddItem = 'AddItem',
  DecreaseQuantity = 'DecreaseQuantity',
  IncreaseQuantity = 'IncreaseQuantity',
  RemoveItem = 'RemoveItem',
  SetQuantity = 'SetQuantity',
  UpdateItem = 'UpdateItem'
}

export type ShoppingBagItem = {
  __typename?: 'ShoppingBagItem';
  bagItemGroupKey: Scalars['String']['output'];
  emailAddress?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  productBundle?: Maybe<ProductBundle>;
  productBundleId?: Maybe<Scalars['String']['output']>;
  productVariant?: Maybe<ProductVariant>;
  productVariantId?: Maybe<Scalars['String']['output']>;
  quantity: Scalars['Float']['output'];
  relationship?: Maybe<Scalars['String']['output']>;
  shippingAddress?: Maybe<StreetAddressObject>;
};

export type ShoppingBagItemInput = {
  action: ShoppingBagEditionAction;
  bagItemGroupKey?: InputMaybe<Scalars['String']['input']>;
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  productBundleId?: InputMaybe<Scalars['String']['input']>;
  productVariantId?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
  relationship?: InputMaybe<Scalars['String']['input']>;
  shippingAddress?: InputMaybe<StreetAddressInput>;
};

export type StreetAddressInput = {
  city: Scalars['String']['input'];
  company?: InputMaybe<Scalars['String']['input']>;
  country: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  line1: Scalars['String']['input'];
  line2?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
  postalCode: Scalars['String']['input'];
  state: Scalars['String']['input'];
};

export type StreetAddressObject = {
  __typename?: 'StreetAddressObject';
  city: Scalars['String']['output'];
  company?: Maybe<Scalars['String']['output']>;
  country: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  line1: Scalars['String']['output'];
  line2?: Maybe<Scalars['String']['output']>;
  phoneNumber?: Maybe<Scalars['String']['output']>;
  postalCode: Scalars['String']['output'];
  state: Scalars['String']['output'];
};

export type SupportTicket = {
  __typename?: 'SupportTicket';
  answered: Scalars['Boolean']['output'];
  answeredAt?: Maybe<Scalars['DateTimeISO']['output']>;
  assignedToProfile?: Maybe<PublicProfile>;
  assignedToProfileId?: Maybe<Scalars['String']['output']>;
  attachments?: Maybe<Array<MediaObject>>;
  comments: Array<SupportTicketComment>;
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  lastUserCommentedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  status: SupportTicketStatus;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  userEmailAddress: Scalars['String']['output'];
};

export type SupportTicketComment = {
  __typename?: 'SupportTicketComment';
  attachments?: Maybe<Array<MediaObject>>;
  content: Scalars['String']['output'];
  contentType: RichContentFormat;
  createdAt: Scalars['DateTimeISO']['output'];
  emailMessageId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  replyToCommentId?: Maybe<Scalars['String']['output']>;
  source: SupportTicketCommentSource;
  visibility: SupportTicketCommentVisibility;
};

export type SupportTicketCommentCreateInput = {
  content: Scalars['String']['input'];
  contentType?: InputMaybe<RichContentFormat>;
  replyToCommentId: Scalars['String']['input'];
  ticketId: Scalars['String']['input'];
  visibility?: InputMaybe<SupportTicketCommentVisibility>;
};

export enum SupportTicketCommentSource {
  Agent = 'Agent',
  User = 'User'
}

export enum SupportTicketCommentVisibility {
  Internal = 'Internal',
  Public = 'Public'
}

export type SupportTicketCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  emailAddress: Scalars['String']['input'];
  initialComment?: InputMaybe<SupportTicketCommentCreateInput>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

/** The status of a support ticket */
export enum SupportTicketStatus {
  Closed = 'Closed',
  Deleted = 'Deleted',
  Open = 'Open'
}

export type SupportTicketUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Task = {
  __typename?: 'Task';
  assignments: Array<TaskAssignment>;
  attempts: Scalars['Float']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId?: Maybe<Scalars['String']['output']>;
  createdByProfileId?: Maybe<Scalars['String']['output']>;
  groupdId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  lastResultId?: Maybe<Scalars['String']['output']>;
  maxAttempts: Scalars['Float']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  origin: TaskOrigin;
  priority: Scalars['Float']['output'];
  procedureArguments: Scalars['JSON']['output'];
  procedureType: AtlasProcedureType;
  regionId: Scalars['String']['output'];
  results: Array<TaskResult>;
  runAt?: Maybe<Scalars['DateTimeISO']['output']>;
  state: TaskState;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type TaskAssignment = {
  __typename?: 'TaskAssignment';
  active: Scalars['Boolean']['output'];
  atlasNode: AtlasNode;
  attempt: Scalars['Float']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  gridNode: GridNode;
  id: Scalars['String']['output'];
  region: Region;
  regionId: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type TaskGroupInput = {
  groupdId: Scalars['String']['input'];
};

export type TaskInput = {
  taskId: Scalars['String']['input'];
};

/** Where the task originated from. */
export enum TaskOrigin {
  System = 'System',
  User = 'User'
}

export type TaskPortScanInput = {
  host: Scalars['String']['input'];
  ports: Array<Scalars['String']['input']>;
  regions?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type TaskResult = {
  __typename?: 'TaskResult';
  atlasNodeId?: Maybe<Scalars['String']['output']>;
  attempt: Scalars['Float']['output'];
  cluster?: Maybe<Cluster>;
  clusterId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  duration: Scalars['Float']['output'];
  error?: Maybe<Scalars['JSON']['output']>;
  gridNodeId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  meta?: Maybe<Scalars['JSON']['output']>;
  ranAt?: Maybe<Scalars['DateTimeISO']['output']>;
  region?: Maybe<Region>;
  regionId?: Maybe<Scalars['String']['output']>;
  result?: Maybe<Scalars['JSON']['output']>;
  taskId: Scalars['String']['output'];
  type: TaskResultType;
  updatedAt: Scalars['DateTimeISO']['output'];
};

/** Task result type. */
export enum TaskResultType {
  Error = 'Error',
  Failure = 'Failure',
  Success = 'Success'
}

/** The possible states of a task. */
export enum TaskState {
  Assigned = 'Assigned',
  Cancelled = 'Cancelled',
  CheckedOut = 'CheckedOut',
  Failed = 'Failed',
  Pending = 'Pending',
  Retry = 'Retry',
  Running = 'Running',
  Succeeded = 'Succeeded'
}

export type TaxRate = {
  __typename?: 'TaxRate';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  lastSyncedAt: Scalars['DateTimeISO']['output'];
  postalCode: Scalars['String']['output'];
  rate: Scalars['Decimal']['output'];
  rateDetail: Scalars['JSON']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type TaxRatesResult = {
  __typename?: 'TaxRatesResult';
  items: Array<TaxRate>;
  pagination?: Maybe<Pagination>;
};

/** Possible time intervals used to group time series data. */
export enum TimeInterval {
  Day = 'Day',
  DayOfMonth = 'DayOfMonth',
  DayOfWeek = 'DayOfWeek',
  Hour = 'Hour',
  HourOfDay = 'HourOfDay',
  Month = 'Month',
  MonthOfYear = 'MonthOfYear',
  Quarter = 'Quarter',
  Year = 'Year'
}

export type TransformShoppingBagResult = {
  __typename?: 'TransformShoppingBagResult';
  from: ShoppingBag;
  to: ShoppingBag;
};

export enum UniqueFieldValidationResult {
  Available = 'Available',
  Forbidden = 'Forbidden',
  Invalid = 'Invalid',
  Taken = 'Taken'
}

export type UpdateEmailListEntryInput = {
  action: ListEntryAction;
  emailAddress: Scalars['String']['input'];
  familyName?: InputMaybe<Scalars['String']['input']>;
  givenName?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
};

export type UpdateEmailListInput = {
  emailListEntryInputs?: InputMaybe<Array<UpdateEmailListEntryInput>>;
  id: Scalars['String']['input'];
  newIdentifier?: InputMaybe<Scalars['String']['input']>;
  newTitle?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateEmailTemplateInput = {
  alias?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  status?: InputMaybe<EmailTemplateStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductBundleInput = {
  addItems?: InputMaybe<Array<CreateProductBundleItemInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  removeItems?: InputMaybe<Array<Scalars['String']['input']>>;
  updateItems?: InputMaybe<Array<UpdateProductBundleItemInput>>;
  visibility?: InputMaybe<ProductBundleVisibility>;
};

export type UpdateProductBundleItemInput = {
  indexId: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};

export type UpdateProductInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  newVariants?: InputMaybe<Array<CreateProductVariantInput>>;
  removedVariantIds?: InputMaybe<Array<Scalars['String']['input']>>;
  status?: InputMaybe<ProductStatus>;
  updatedVariants?: InputMaybe<Array<UpdateProductVariantInput>>;
};

export type UpdateProductVariantAttributeInput = {
  attributeToUpsert: ProductVariantAttributeInput;
  idToDelete?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductVariantInput = {
  attributes?: InputMaybe<Array<UpdateProductVariantAttributeInput>>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  gtin?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  inventoryPolicy?: InputMaybe<ProductVariantInventoryPolicy>;
  isVirtual?: InputMaybe<Scalars['Boolean']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  position?: InputMaybe<Scalars['Float']['input']>;
  price?: InputMaybe<ProductVariantPriceInput>;
  setDefault?: InputMaybe<Scalars['Boolean']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductVariantStatus>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
  unitInfo?: InputMaybe<ProductVariantUnitInfoInput>;
};

export type UpdateVendorInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<VendorStatus>;
};

export type UpsertEmailAutomationInput = {
  automationKey: Scalars['String']['input'];
  availableMetadata?: InputMaybe<Array<AvailableMetadataInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  emailTemplateId?: InputMaybe<Scalars['String']['input']>;
  fromEmail?: InputMaybe<Scalars['String']['input']>;
  fromName?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertEmailTemplateContentInput = {
  body?: InputMaybe<Scalars['String']['input']>;
  contentFormat?: InputMaybe<EmailContentFormat>;
  emailTemplateId: Scalars['String']['input'];
  languageCode?: InputMaybe<Scalars['String']['input']>;
  markCurrent?: InputMaybe<Scalars['Boolean']['input']>;
  metadata?: InputMaybe<EmailTemplateMetadataInput>;
  notes?: InputMaybe<Scalars['String']['input']>;
  referencedContentId?: InputMaybe<Scalars['String']['input']>;
  subject?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertShoppingBagInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  identifier: Scalars['String']['input'];
  /** The item array could be empty */
  items: Array<ShoppingBagItemInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type UpsertWalletEntryInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  paymentMethod?: InputMaybe<PaymentMethodInput>;
  tier?: InputMaybe<WalletEntryTier>;
};

export type ValidateAddressResult = {
  __typename?: 'ValidateAddressResult';
  candidateAddresses?: Maybe<Array<StreetAddressObject>>;
  isApoFpo?: Maybe<Scalars['Boolean']['output']>;
  isPoBox?: Maybe<Scalars['Boolean']['output']>;
  isValid: Scalars['Boolean']['output'];
  message?: Maybe<Scalars['String']['output']>;
  originalAddress: StreetAddressObject;
};

export type Vendor = {
  __typename?: 'Vendor';
  address?: Maybe<AddressBookEntry>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  name: Scalars['String']['output'];
  pagedProducts?: Maybe<ProductsPaginationResult>;
  products: ProductsPaginationResult;
  status: VendorStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};


export type VendorProductsArgs = {
  input?: InputMaybe<PaginationInput>;
};

export enum VendorStatus {
  Active = 'Active',
  Archived = 'Archived',
  Inactive = 'Inactive'
}

export type VendorsResult = {
  __typename?: 'VendorsResult';
  items: Array<Vendor>;
  pagination?: Maybe<Pagination>;
};

export type WaitList = {
  __typename?: 'WaitList';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type WaitListCreationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  emailAutomationKey?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type WaitListEntriesResult = {
  __typename?: 'WaitListEntriesResult';
  items: Array<WaitListEntry>;
  pagination?: Maybe<Pagination>;
};

export type WaitListEntry = {
  __typename?: 'WaitListEntry';
  accountId?: Maybe<Scalars['String']['output']>;
  contactedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  emailAddress: Scalars['String']['output'];
  id: Scalars['String']['output'];
  ipAddress?: Maybe<Scalars['String']['output']>;
  message?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  notifiedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  profileId?: Maybe<Scalars['String']['output']>;
  referredBy?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  userAgent?: Maybe<Scalars['String']['output']>;
  waitList?: Maybe<WaitList>;
  waitListId: Scalars['String']['output'];
};

export type WaitListResult = {
  __typename?: 'WaitListResult';
  items: Array<WaitList>;
  pagination?: Maybe<Pagination>;
};

export type WaitListUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  emailAutomationKey?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type WalletEntry = {
  __typename?: 'WalletEntry';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  paymentMethod: PaymentMethod;
  status: WalletEntryStatus;
  statusDescription?: Maybe<Scalars['String']['output']>;
  tier: WalletEntryTier;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export enum WalletEntryStatus {
  Confirmed = 'Confirmed',
  Pending = 'Pending',
  RequiresUserAction = 'RequiresUserAction'
}

export enum WalletEntryTier {
  Primary = 'Primary',
  Secondary = 'Secondary'
}

export type Warehouse = {
  __typename?: 'Warehouse';
  address: StreetAddressObject;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type WarehouseCreateInput = {
  address: StreetAddressInput;
  name: Scalars['String']['input'];
};

export type WarehouseInventory = {
  __typename?: 'WarehouseInventory';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  lowInventoryThreshold?: Maybe<Scalars['Int']['output']>;
  quantity: Scalars['Int']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type WarehouseInventoryCreateInput = {
  lowInventoryThreshold?: InputMaybe<Scalars['Int']['input']>;
  productVariantId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
  warehouseId: Scalars['String']['input'];
};

export type WarehouseInventoryUpdateInput = {
  id: Scalars['String']['input'];
  lowInventoryThreshold?: InputMaybe<Scalars['Int']['input']>;
  quantity?: InputMaybe<Scalars['Int']['input']>;
  quantityUpdateType?: InputMaybe<WarehouseInventoryUpdateType>;
};

export enum WarehouseInventoryUpdateType {
  Add = 'Add',
  Set = 'Set',
  Subtract = 'Subtract'
}

export type WarehouseUpdateInput = {
  address?: InputMaybe<StreetAddressInput>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum WeightUnit {
  Gram = 'Gram',
  Kilogram = 'Kilogram',
  Ounces = 'Ounces',
  Pounds = 'Pounds'
}

export type AccountRegistrationOrSignInCreateMutationVariables = Exact<{
  input: AccountRegistrationOrSignInCreateInput;
}>;


export type AccountRegistrationOrSignInCreateMutation = { __typename?: 'Mutation', accountRegistrationOrSignInCreate: { __typename?: 'AuthenticationRegistrationOrSignIn', emailAddress: string, authentication: { __typename?: 'AuthenticationSession', status: AuthenticationSessionStatus, scopeType: string, updatedAt: any, createdAt: any, currentChallenge?: { __typename?: 'AuthenticationChallenge', challengeType: string, status: AuthenticationChallengeStatus } | null } } };

export type AccountRegistrationCompleteMutationVariables = Exact<{
  input: AccountRegistrationCompleteInput;
}>;


export type AccountRegistrationCompleteMutation = { __typename?: 'Mutation', accountRegistrationComplete: { __typename?: 'AuthenticationOperationResult', success: boolean } };

export type AccountSignInCompleteMutationVariables = Exact<{ [key: string]: never; }>;


export type AccountSignInCompleteMutation = { __typename?: 'Mutation', accountSignInComplete: { __typename?: 'AuthenticationOperationResult', success: boolean } };

export type AuthenticationCurrentQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthenticationCurrentQuery = { __typename?: 'Query', authenticationCurrent?: { __typename?: 'AuthenticationSession', status: AuthenticationSessionStatus, scopeType: string, updatedAt: any, createdAt: any, currentChallenge?: { __typename?: 'AuthenticationChallenge', challengeType: string, status: AuthenticationChallengeStatus } | null } | null };

export type EmailVerificationQueryVariables = Exact<{ [key: string]: never; }>;


export type EmailVerificationQuery = { __typename?: 'Query', emailVerification?: { __typename?: 'AuthenticationEmailVerification', verification: { __typename?: 'EmailVerification', status: EmailVerificationStatus, emailAddress: string, lastEmailSentAt?: any | null }, authentication: { __typename?: 'AuthenticationSession', status: AuthenticationSessionStatus, scopeType: string, updatedAt: any, createdAt: any, currentChallenge?: { __typename?: 'AuthenticationChallenge', challengeType: string, status: AuthenticationChallengeStatus } | null } } | null };

export type EmailVerificationSendMutationVariables = Exact<{ [key: string]: never; }>;


export type EmailVerificationSendMutation = { __typename?: 'Mutation', emailVerificationSend: { __typename?: 'AuthenticationEmailVerification', verification: { __typename?: 'EmailVerification', status: EmailVerificationStatus, emailAddress: string, lastEmailSentAt?: any | null }, authentication: { __typename?: 'AuthenticationSession', status: AuthenticationSessionStatus, scopeType: string, updatedAt: any, createdAt: any, currentChallenge?: { __typename?: 'AuthenticationChallenge', challengeType: string, status: AuthenticationChallengeStatus } | null } } };

export type EmailVerificationVerifyMutationVariables = Exact<{
  input: EmailVerificationVerifyInput;
}>;


export type EmailVerificationVerifyMutation = { __typename?: 'Mutation', emailVerificationVerify: { __typename?: 'AuthenticationEmailVerification', verification: { __typename?: 'EmailVerification', status: EmailVerificationStatus, emailAddress: string, lastEmailSentAt?: any | null }, authentication: { __typename?: 'AuthenticationSession', status: AuthenticationSessionStatus, scopeType: string, updatedAt: any, createdAt: any, currentChallenge?: { __typename?: 'AuthenticationChallenge', challengeType: string, status: AuthenticationChallengeStatus } | null } } };

export type AccountPasswordVerifyMutationVariables = Exact<{
  input: AccountPasswordVerifyInput;
}>;


export type AccountPasswordVerifyMutation = { __typename?: 'Mutation', accountPasswordVerify: { __typename?: 'AuthenticationOperationResult', success: boolean, authentication: { __typename?: 'AuthenticationSession', status: AuthenticationSessionStatus, scopeType: string, updatedAt: any, createdAt: any, currentChallenge?: { __typename?: 'AuthenticationChallenge', challengeType: string, status: AuthenticationChallengeStatus } | null } } };

export type AccountSignOutMutationVariables = Exact<{ [key: string]: never; }>;


export type AccountSignOutMutation = { __typename?: 'Mutation', accountSignOut: { __typename?: 'OperationResult', success: boolean } };

export type AccountCurrentQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountCurrentQuery = { __typename?: 'Query', accountCurrent: { __typename?: 'Account', createdAt: any, currentProfile?: { __typename?: 'Profile', id: string, createdAt: any, updatedAt: any, username: string, displayName?: string | null, givenName?: string | null, familyName?: string | null, phoneNumber?: string | null, imageUrls?: Array<{ __typename?: 'ImageObject', url: string, variant?: string | null }> | null } | null, primaryAccountEmail?: { __typename?: 'AccountEmail', id: string, type: AccountEmailType, isVerified: boolean, emailAddress: string, source: string, updatedAt: any, createdAt: any } | null, roles: Array<{ __typename?: 'AccessRole', id: string, type: string, status: AccessRoleStatus, expiresAt?: any | null, updatedAt: any, createdAt: any }>, currentSession?: { __typename?: 'AccountSession', currentProfileId: string, status: AccountSessionStatus, statusChangedAt?: any | null, updatedAt: any, createdAt: any } | null } };

export type AccountProfileUsernameValidateQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type AccountProfileUsernameValidateQuery = { __typename?: 'Query', accountProfileUsernameValidate: UniqueFieldValidationResult };

export type AccountProfileUpdateMutationVariables = Exact<{
  input: AccountProfileUpdateInput;
}>;


export type AccountProfileUpdateMutation = { __typename?: 'Mutation', accountProfileUpdate: { __typename?: 'Profile', id: string, username: string, givenName?: string | null, preferredName?: string | null, middleName?: string | null, familyName?: string | null, displayName?: string | null, phoneNumber?: string | null, updatedAt: any, createdAt: any, imageUrls?: Array<{ __typename?: 'ImageObject', url: string, variant?: string | null }> | null } };

export type ProfilePublicQueryVariables = Exact<{
  username: Scalars['String']['input'];
}>;


export type ProfilePublicQuery = { __typename?: 'Query', profilePublic?: { __typename?: 'PublicProfile', username: string, displayName?: string | null, createdAt?: any | null, imageUrls?: Array<{ __typename?: 'ImageObject', url: string, variant?: string | null }> | null } | null };

export type AccountAssignableRolesQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountAssignableRolesQuery = { __typename?: 'Query', accountAssignableRoles: Array<string> };

export type AccountRolesQueryVariables = Exact<{
  statuses?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
  orderBy?: InputMaybe<OrderBy>;
}>;


export type AccountRolesQuery = { __typename?: 'Query', accountRoles: Array<{ __typename?: 'AccessRole', id: string, type: string, status: AccessRoleStatus, primaryAccountEmailAddress?: string | null, expiresAt?: any | null, createdAt: any, updatedAt: any, profile?: { __typename?: 'PublicProfile', username: string, displayName?: string | null, createdAt?: any | null, imageUrls?: Array<{ __typename?: 'ImageObject', type: MediaObjectType, url: string, variant?: string | null }> | null } | null }> };

export type AccountRoleRevokeMutationVariables = Exact<{
  roleId: Scalars['String']['input'];
}>;


export type AccountRoleRevokeMutation = { __typename?: 'Mutation', accountRoleRevoke: { __typename?: 'OperationResult', success: boolean } };

export type AccountRoleGrantMutationVariables = Exact<{
  input: GrantAccessRoleInput;
}>;


export type AccountRoleGrantMutation = { __typename?: 'Mutation', accountRoleGrant: { __typename?: 'AccessRole', id: string, type: string, status: AccessRoleStatus, expiresAt?: any | null, createdAt: any, updatedAt: any, profile?: { __typename?: 'PublicProfile', username: string, displayName?: string | null, createdAt?: any | null, imageUrls?: Array<{ __typename?: 'ImageObject', type: MediaObjectType, url: string, variant?: string | null }> | null } | null } };

export type AccountsAdminQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type AccountsAdminQuery = { __typename?: 'Query', accountsAdmin: { __typename?: 'PagedAccountAdminQueryObject', items: Array<{ __typename?: 'AccountAdminQueryObject', emailAddress: string, profiles: Array<{ __typename?: 'PublicProfile', username: string, displayName?: string | null, createdAt?: any | null, imageUrls?: Array<{ __typename?: 'ImageObject', url: string, variant?: string | null }> | null }> }>, pagination?: { __typename?: 'Pagination', itemsTotal: number, itemsPerPage: number, page: number, pagesTotal: number, itemIndex: number, itemIndexForNextPage?: number | null, itemIndexForPreviousPage?: number | null } | null } };

export type AccountByEmailAddressAdminQueryVariables = Exact<{
  emailAddress: Scalars['String']['input'];
}>;


export type AccountByEmailAddressAdminQuery = { __typename?: 'Query', accountByEmailAddressAdmin: { __typename?: 'AccountAdminQueryObject', emailAddress: string, profiles: Array<{ __typename?: 'PublicProfile', username: string, displayName?: string | null, createdAt?: any | null, imageUrls?: Array<{ __typename?: 'ImageObject', url: string, variant?: string | null }> | null }> } };

export type AccountDeleteAdminMutationVariables = Exact<{
  emailAddress: Scalars['String']['input'];
}>;


export type AccountDeleteAdminMutation = { __typename?: 'Mutation', accountDeleteAdmin: { __typename?: 'OperationResult', success: boolean } };

export type CommerceOrdersAdminQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInputWithFilters>;
  orderBy?: InputMaybe<OrderBy>;
}>;


export type CommerceOrdersAdminQuery = { __typename?: 'Query', commerceOrdersAdmin: { __typename?: 'PaginationOrderResult', items: Array<{ __typename?: 'CommerceOrder', batchIdentifier: string, beneficiaryEmailAddress?: string | null, createdAt: any, emailAddress: string, fulfillmentSource?: string | null, fulfillmentStatus: CommerceOrderFulfillmentStatus, holdOnShipping: boolean, id: string, identifier: string, metadata?: any | null, paymentId?: string | null, paymentStatus?: PaymentStatus | null, source: string, statusDescription?: string | null, status: CommerceOrderStatus, updatedAt: any, lineItems?: Array<{ __typename?: 'CommerceOrderLineItem', commerceOrderId: string, createdAt: any, fulfilledQuantity: number, id: string, indexId: number, productVariantId: string, quantity: number, status: CommerceOrderLineItemStatus, shippedQuantity: number, statusDescription?: string | null, updatedAt: any }> | null, orderLogs?: Array<{ __typename?: 'CommerceOrderLog', commerceOrderId: string, content?: any | null, id: string, description?: string | null, createdAt: any, source: CommerceOrderLogSource, visibility: CommerceOrderLogVisibility }> | null, payment?: { __typename?: 'Payment', amount: any, authorizedAt?: any | null, cancelledAt?: any | null, capturedAt?: any | null, confirmedAt?: any | null, createdAt: any, currencyCode: string, externalReferenceId?: string | null, id: string, paymentProcessorType: PaymentProcessorType, status: PaymentStatus, statusDescription?: string | null, updatedAt: any, walletEntryId?: string | null, paymentMethod?: { __typename?: 'PaymentMethodAppleInAppPurchase', externalResourceId?: string | null, paymentProcessorType: PaymentProcessorType, type: PaymentMethodType } | { __typename?: 'PaymentMethodCreditCard', externalResourceId?: string | null, cardType: CreditCardType, expirationMonth: number, expirationYear: number, last4: string, paymentProcessorType: PaymentProcessorType, type: PaymentMethodType, billingAddress: { __typename?: 'StreetAddressObject', city: string, company?: string | null, country: string, firstName: string, lastName: string, line1: string, line2?: string | null, postalCode: string, state: string, phoneNumber?: string | null } } | null } | null, priceInfo: { __typename?: 'CommerceOrderPrice', amount: any, currencyCode: string, originalSubtotal: any, subtotal: any, lineItemPrices: Array<{ __typename?: 'CommerceOrderLineItemPrice', amount: any, indexId: number, originalSubtotal: any, subtotal: any, tax: any }>, shippingRate: { __typename?: 'CommerceOrderShippingRate', amount: any, originalAmount: any, breakdown: Array<{ __typename?: 'CommerceOrderShippingRateBreakdown', freeShipping: boolean, originalShippingRate: any, packageIndexId: number, shippingRate: any, items: Array<{ __typename?: 'CommerceOrderShippingRateBreakdownItem', indexId: number, quantity: number }> }> }, tax: { __typename?: 'CommerceOrderTax', shipping: any, total: any } }, shipments?: Array<{ __typename?: 'Shipment', cancelledAt?: any | null, createdAt: any, createdByAccountId?: string | null, createdByProfileId?: string | null, deliveredAt?: any | null, deliveryStatus: DeliveryStatus, id: string, orderIndexId: number, shippedAt?: any | null, source: string, status: ShipmentStatus, statusDescription?: string | null, updatedAt: any, updatedByAccountId?: string | null, updatedByProfileId?: string | null, label?: { __typename?: 'ShippingLabel', carrier: string, labelId: string, serviceType: ShippingServiceType, source: ShippingLabelSource, trackingNumber: string, trackingUrl?: string | null } | null, orderSlip?: { __typename?: 'ShippingOrderSlip', storedObjectUrl?: string | null } | null, toAddress: { __typename?: 'StreetAddressObject', city: string, company?: string | null, country: string, firstName: string, lastName: string, line1: string, line2?: string | null, phoneNumber?: string | null, state: string, postalCode: string } }> | null, shippingInfo?: { __typename?: 'CommerceOrderShippingInfo', shippingAddress: { __typename?: 'StreetAddressObject', city: string, country: string, company?: string | null, lastName: string, firstName: string, line1: string, line2?: string | null, phoneNumber?: string | null, postalCode: string, state: string } } | null }>, pagination?: { __typename?: 'Pagination', itemsTotal: number, itemsPerPage: number, page: number, pagesTotal: number, itemIndex: number, itemIndexForNextPage?: number | null, itemIndexForPreviousPage?: number | null } | null } };

export type GetBagItemsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBagItemsQuery = { __typename?: 'Query', commerceCart: { __typename?: 'ShoppingBag', id: string, identifier: string, createdAt: any, title?: string | null, description?: string | null, items: Array<{ __typename?: 'ShoppingBagItem', id: string, quantity: number, firstName?: string | null, lastName?: string | null, relationship?: string | null, emailAddress?: string | null, productBundle?: { __typename?: 'ProductBundle', id: string, items: Array<{ __typename?: 'ProductBundleItem', quantity: number, productVariant?: { __typename?: 'ProductVariant', id: string, description?: string | null, name: string, price: { __typename?: 'ProductVariantPriceObject', currencyCode: string, amount: any } } | null }> } | null, shippingAddress?: { __typename?: 'StreetAddressObject', company?: string | null, line1: string, line2?: string | null, city: string, state: string, postalCode: string, country: string, firstName: string, lastName: string, phoneNumber?: string | null } | null }> } };

export type UpdateBagWithItemsMutationVariables = Exact<{
  input: Array<ShoppingBagItemInput> | ShoppingBagItemInput;
}>;


export type UpdateBagWithItemsMutation = { __typename?: 'Mutation', commerceCartUpdate: { __typename?: 'ShoppingBag', id: string, identifier: string, title?: string | null, description?: string | null, items: Array<{ __typename?: 'ShoppingBagItem', id: string, quantity: number, firstName?: string | null, lastName?: string | null, relationship?: string | null, emailAddress?: string | null, productBundle?: { __typename?: 'ProductBundle', id: string, items: Array<{ __typename?: 'ProductBundleItem', quantity: number, productVariant?: { __typename?: 'ProductVariant', id: string, description?: string | null, name: string, price: { __typename?: 'ProductVariantPriceObject', currencyCode: string, amount: any } } | null }> } | null, shippingAddress?: { __typename?: 'StreetAddressObject', company?: string | null, line1: string, line2?: string | null, city: string, state: string, postalCode: string, country: string, firstName: string, lastName: string, phoneNumber?: string | null } | null }> } };

export type EstimateOrderPriceQueryVariables = Exact<{
  itemIds: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type EstimateOrderPriceQuery = { __typename?: 'Query', commerceShoppingBagPriceEstimate: Array<{ __typename?: 'CommerceOrderPrice', amount: any, currencyCode: string, originalSubtotal: any, subtotal: any, lineItemPrices: Array<{ __typename?: 'CommerceOrderLineItemPrice', amount: any, indexId: number, originalSubtotal: any, subtotal: any, tax: any }>, shippingRate: { __typename?: 'CommerceOrderShippingRate', amount: any, originalAmount: any, breakdown: Array<{ __typename?: 'CommerceOrderShippingRateBreakdown', freeShipping: boolean, originalShippingRate: any, shippingRate: any, packageIndexId: number, items: Array<{ __typename?: 'CommerceOrderShippingRateBreakdownItem', indexId: number, quantity: number }> }> }, tax: { __typename?: 'CommerceOrderTax', shipping: any, total: any } }> };

export type BagCheckoutMutationVariables = Exact<{
  input: ShoppingBagCheckoutInput;
}>;


export type BagCheckoutMutation = { __typename?: 'Mutation', commerceShoppingBagCheckout: Array<{ __typename?: 'CommerceOrder', id: string, batchIdentifier: string, holdOnShipping: boolean, fulfillmentStatus: CommerceOrderFulfillmentStatus, emailAddress: string, identifier: string, paymentId?: string | null, paymentStatus?: PaymentStatus | null, source: string, status: CommerceOrderStatus, statusDescription?: string | null, payment?: { __typename?: 'Payment', amount: any, authorizedAt?: any | null, cancelledAt?: any | null, capturedAt?: any | null, confirmedAt?: any | null, createdAt: any, currencyCode: string, externalReferenceId?: string | null, id: string, paymentProcessorType: PaymentProcessorType, status: PaymentStatus, statusDescription?: string | null, updatedAt: any, walletEntryId?: string | null } | null, priceInfo: { __typename?: 'CommerceOrderPrice', amount: any, currencyCode: string, originalSubtotal: any, subtotal: any, lineItemPrices: Array<{ __typename?: 'CommerceOrderLineItemPrice', amount: any, indexId: number, originalSubtotal: any, subtotal: any, tax: any }>, shippingRate: { __typename?: 'CommerceOrderShippingRate', amount: any, originalAmount: any }, tax: { __typename?: 'CommerceOrderTax', shipping: any, total: any } }, shippingInfo?: { __typename?: 'CommerceOrderShippingInfo', shippingAddress: { __typename?: 'StreetAddressObject', company?: string | null, line1: string, line2?: string | null, city: string, state: string, postalCode: string, country: string, firstName: string, lastName: string, phoneNumber?: string | null } } | null, lineItems?: Array<{ __typename?: 'CommerceOrderLineItem', id: string, createdAt: any, updatedAt: any, indexId: number, quantity: number, fulfilledQuantity: number, shippedQuantity: number, status: CommerceOrderLineItemStatus, statusDescription?: string | null, productVariantId: string, commerceOrderId: string }> | null }> };

export type CommerceCheckoutSessionCreateMutationVariables = Exact<{
  input: CommerceCheckoutSessionCreateInput;
}>;


export type CommerceCheckoutSessionCreateMutation = { __typename?: 'Mutation', commerceCheckoutSessionCreate: { __typename?: 'CommerceCheckoutSession', id: string, status: CommerceCheckoutSessionStatus, externalMetadata?: any | null, failedCount: number, closedAt?: any | null, completedAt?: any | null, createdAt: any, orders?: Array<{ __typename?: 'CommerceOrder', id: string, status: CommerceOrderStatus, paymentStatus?: PaymentStatus | null }> | null } };

export type ContactsQueryVariables = Exact<{
  pagination: PaginationInputWithFilters;
}>;


export type ContactsQuery = { __typename?: 'Query', contacts: { __typename?: 'PagedContactResult', items: Array<{ __typename?: 'Contact', name: string, type: ContactType, source: string, metadata: any, note?: string | null, fields?: Array<{ __typename?: 'ContactField', type: ContactFieldType, label?: string | null, value: any }> | null }>, pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, pagesTotal: number, page: number } | null } };

export type ContactQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ContactQuery = { __typename?: 'Query', contact: { __typename?: 'Contact', name: string, type: ContactType, source: string, metadata: any, note?: string | null, fields?: Array<{ __typename?: 'ContactField', type: ContactFieldType, label?: string | null, value: any }> | null } };

export type ContactCreateMutationVariables = Exact<{
  input: ContactCreateInput;
}>;


export type ContactCreateMutation = { __typename?: 'Mutation', contactCreate: { __typename?: 'Contact', name: string, type: ContactType, source: string, metadata: any, note?: string | null, fields?: Array<{ __typename?: 'ContactField', type: ContactFieldType, label?: string | null, value: any }> | null } };

export type ContactUpdateMutationVariables = Exact<{
  input: ContactUpdateInput;
}>;


export type ContactUpdateMutation = { __typename?: 'Mutation', contactUpdate: { __typename?: 'Contact', name: string, type: ContactType, source: string, metadata: any, note?: string | null, fields?: Array<{ __typename?: 'ContactField', type: ContactFieldType, label?: string | null, value: any }> | null } };

export type ContactFieldUpdateMutationVariables = Exact<{
  contactId: Scalars['String']['input'];
  input: ContactFieldUpdateInput;
}>;


export type ContactFieldUpdateMutation = { __typename?: 'Mutation', contactFieldUpdate: { __typename?: 'Contact', name: string, type: ContactType, source: string, metadata: any, note?: string | null, fields?: Array<{ __typename?: 'ContactField', type: ContactFieldType, label?: string | null, value: any }> | null } };

export type ContactDeleteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type ContactDeleteMutation = { __typename?: 'Mutation', contactDelete: boolean };

export type DataInteractionDatabasesQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type DataInteractionDatabasesQuery = { __typename?: 'Query', dataInteractionDatabases: { __typename?: 'PagedDatabasesResult', items: Array<{ __typename?: 'DatebaseMetadata', databaseName: string }>, pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, pagesTotal: number, page: number } | null } };

export type DataInteractionDatabaseTableQueryVariables = Exact<{
  databaseName: Scalars['String']['input'];
  tableName: Scalars['String']['input'];
}>;


export type DataInteractionDatabaseTableQuery = { __typename?: 'Query', dataInteractionDatabaseTable: { __typename?: 'DatabaseTableMetadata', databaseName: string, tableName: string, columns?: Array<{ __typename?: 'DatabaseTableColumn', name: string, type: string, isKey: boolean, isPrimaryKey: boolean, keyTableName?: string | null, possibleValues?: Array<string> | null, isNullable: boolean, isGenerated: boolean, length: string }> | null, relations?: Array<{ __typename?: 'DatabaseTableRelation', fieldName: string, type: string, tableName: string, inverseFieldName?: string | null, inverseType?: string | null, inverseTableName?: string | null }> | null } };

export type DataInteractionDatabaseTableMetricsQueryVariables = Exact<{
  input: DataInteractionDatabaseTableMetricsQueryInput;
}>;


export type DataInteractionDatabaseTableMetricsQuery = { __typename?: 'Query', dataInteractionDatabaseTableMetrics: Array<{ __typename?: 'DataInteractionDatabaseMetrics', timeInterval: TimeInterval, data: Array<any> }> };

export type DataInteractionDatabaseTablesQueryVariables = Exact<{
  databaseName?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type DataInteractionDatabaseTablesQuery = { __typename?: 'Query', dataInteractionDatabaseTables: { __typename?: 'DatabaseTablesResult', items: Array<{ __typename?: 'DatabaseTableMetadata', databaseName: string, tableName: string, rowCount: number }>, pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, pagesTotal: number, page: number } | null } };

export type DataInteractionDatabaseTableRowsQueryVariables = Exact<{
  databaseName: Scalars['String']['input'];
  tableName: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
  orderBy?: InputMaybe<OrderBy>;
  filters?: InputMaybe<ColumnFilterGroup>;
}>;


export type DataInteractionDatabaseTableRowsQuery = { __typename?: 'Query', dataInteractionDatabaseTableRows: { __typename?: 'DatabaseTableMetadata', items?: Array<any> | null, databaseName: string, tableName: string, rowCount: number, columns?: Array<{ __typename?: 'DatabaseTableColumn', name: string, type: string, isKey: boolean, isPrimaryKey: boolean, keyTableName?: string | null, possibleValues?: Array<string> | null, isNullable: boolean, isGenerated: boolean, length: string }> | null, relations?: Array<{ __typename?: 'DatabaseTableRelation', fieldName: string, tableName: string, type: string, inverseFieldName?: string | null, inverseType?: string | null, inverseTableName?: string | null }> | null, pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, pagesTotal: number, page: number } | null } };

export type EmailCampaignsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInputWithFilters>;
}>;


export type EmailCampaignsQuery = { __typename?: 'Query', emailCampaigns: { __typename?: 'PagedEmailCampaigns', items: Array<{ __typename?: 'EmailCampaign', id: string, title: string, description?: string | null, fromName: string, fromEmail: string, status: EmailCampaignStatus, currentStageIndexId: number, updatedByAccountId?: string | null, updatedByProfileId?: string | null, updatedAt: any, createdByAccountId: string, createdByProfileId: string, createdAt: any, deliveryStages: Array<{ __typename?: 'CampaignDeliveryStage', indexId: number, percentToSend: number, stageStatus: CampaignDeliveryStageStatus, emailsSent?: number | null, percentSent?: number | null, startedAt?: any | null, completedAt?: any | null, emailTemplateId?: string | null, emailTemplateContentId?: string | null }> }>, pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, pagesTotal: number, page: number } | null } };

export type EmailListsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>;
}>;


export type EmailListsQuery = { __typename?: 'Query', emailLists: { __typename?: 'PagedEmailLists', items: Array<{ __typename?: 'EmailList', id: string, identifier: string, title: string, updatedAt: any, updatedByAccountId?: string | null, updatedByProfileId?: string | null, createdByAccountId: string, createdByProfileId: string, createdAt: any, pagedEmailListEntries?: { __typename?: 'PagedEmailListEntries', pagination?: { __typename?: 'Pagination', itemsTotal: number } | null } | null }> } };

export type EngagementEventCreateMutationVariables = Exact<{
  input: CreateEngagementEventInput;
}>;


export type EngagementEventCreateMutation = { __typename?: 'Mutation', engagementEventCreate: { __typename?: 'OperationResult', success: boolean } };

export type EngagementEventsCreateMutationVariables = Exact<{
  input: Array<CreateEngagementEventInput> | CreateEngagementEventInput;
}>;


export type EngagementEventsCreateMutation = { __typename?: 'Mutation', engagementEventsCreate: { __typename?: 'OperationResult', success: boolean } };

export type EngagementOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type EngagementOverviewQuery = { __typename?: 'Query', engagementOverview: { __typename?: 'EngagementOverview', uniqueDeviceIds: number, deviceCategoryPercentages: any, views: Array<{ __typename?: 'EngagementViewOverview', uniqueDeviceCount: number, viewIdentifier?: string | null }>, locations: Array<{ __typename?: 'EngagementLocationOverview', uniqueDeviceCount: number, countryCode?: string | null, latitude?: string | null, longitude?: string | null }> } };

export type PostsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInputWithFilters>;
  orderBy?: InputMaybe<OrderBy>;
}>;


export type PostsQuery = { __typename?: 'Query', posts: { __typename?: 'PagedPosts', items: Array<{ __typename?: 'Post', id: string, identifier: string, slug: string, status: PostStatus, title: string, createdByProfileId: string, content?: string | null, upvoteCount: number, downvoteCount: number, voteType?: PostVoteType | null, reportedCount: number, reportStatus?: PostReportStatus | null, metadata?: any | null, latestRevisionId?: string | null, updatedAt: any, createdAt: any, createdByProfile?: { __typename?: 'PublicProfile', displayName?: string | null, username: string, imageUrls?: Array<{ __typename?: 'ImageObject', url: string, type: MediaObjectType, variant?: string | null }> | null } | null, topics?: Array<{ __typename?: 'PostTopic', id: string, title: string, slug: string }> | null, reactions?: Array<{ __typename?: 'PostReaction', content: string, count: number, reacted: boolean }> | null }>, pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, pagesTotal: number, page: number } | null } };

export type PostsMineQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInputWithFilters>;
}>;


export type PostsMineQuery = { __typename?: 'Query', postsMine: { __typename?: 'PagedPosts', items: Array<{ __typename?: 'Post', id: string, identifier: string, slug: string, status: PostStatus, title: string, createdByProfileId: string, content?: string | null, upvoteCount: number, downvoteCount: number, voteType?: PostVoteType | null, reportedCount: number, reportStatus?: PostReportStatus | null, metadata?: any | null, latestRevisionId?: string | null, updatedAt: any, createdAt: any, createdByProfile?: { __typename?: 'PublicProfile', displayName?: string | null, username: string, imageUrls?: Array<{ __typename?: 'ImageObject', url: string, type: MediaObjectType, variant?: string | null }> | null } | null, topics?: Array<{ __typename?: 'PostTopic', id: string, title: string, slug: string }> | null, reactions?: Array<{ __typename?: 'PostReaction', content: string, count: number, reacted: boolean }> | null }>, pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, pagesTotal: number, page: number } | null } };

export type PostQueryVariables = Exact<{
  identifier: Scalars['String']['input'];
}>;


export type PostQuery = { __typename?: 'Query', post: { __typename?: 'Post', id: string, identifier: string, slug: string, status: PostStatus, title: string, createdByProfileId: string, content?: string | null, upvoteCount: number, downvoteCount: number, voteType?: PostVoteType | null, reportedCount: number, reportStatus?: PostReportStatus | null, type: string, metadata?: any | null, latestRevisionId?: string | null, updatedAt: any, createdAt: any, createdByProfile?: { __typename?: 'PublicProfile', displayName?: string | null, username: string, imageUrls?: Array<{ __typename?: 'ImageObject', url: string, type: MediaObjectType, variant?: string | null }> | null } | null, topics?: Array<{ __typename?: 'PostTopic', id: string, title: string }> | null, reactions?: Array<{ __typename?: 'PostReaction', content: string, count: number, reacted: boolean }> | null } };

export type PostCreateMutationVariables = Exact<{
  input: PostCreateInput;
}>;


export type PostCreateMutation = { __typename?: 'Mutation', postCreateAdmin: { __typename?: 'Post', id: string, status: PostStatus, title: string, contentType: RichContentFormat, content?: string | null, settings?: any | null, upvoteCount: number, downvoteCount: number, metadata?: any | null, updatedAt: any, createdAt: any } };

export type PostUpdateMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: PostUpdateInput;
}>;


export type PostUpdateMutation = { __typename?: 'Mutation', postUpdate: { __typename?: 'Post', id: string, status: PostStatus, title: string, contentType: RichContentFormat, content?: string | null, settings?: any | null, upvoteCount: number, downvoteCount: number, metadata?: any | null, updatedAt: any, createdAt: any } };

export type PostDeleteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PostDeleteMutation = { __typename?: 'Mutation', postDelete: string };

export type PostVoteMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  type: PostVoteType;
}>;


export type PostVoteMutation = { __typename?: 'Mutation', postVote: boolean };

export type PostUnvoteMutationVariables = Exact<{
  postId: Scalars['String']['input'];
}>;


export type PostUnvoteMutation = { __typename?: 'Mutation', postUnvote: boolean };

export type PostReactionCreateMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type PostReactionCreateMutation = { __typename?: 'Mutation', postReactionCreate: boolean };

export type PostReactionDeleteMutationVariables = Exact<{
  postId: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type PostReactionDeleteMutation = { __typename?: 'Mutation', postReactionDelete: boolean };

export type PostReactionProfilesQueryVariables = Exact<{
  postId: Scalars['String']['input'];
  content: Scalars['String']['input'];
  pagination?: InputMaybe<PaginationInput>;
}>;


export type PostReactionProfilesQuery = { __typename?: 'Query', postReactionProfiles: { __typename?: 'PagedPostReactionProfile', items: Array<{ __typename?: 'PostReactionProfile', username: string, displayName?: string | null, profileId: string }>, pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, pagesTotal: number, page: number } | null } };

export type PostReportCreateMutationVariables = Exact<{
  input: PostReportInput;
}>;


export type PostReportCreateMutation = { __typename?: 'Mutation', postReportCreate: { __typename?: 'PostReport', id: string } };

export type PostTopicByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PostTopicByIdQuery = { __typename?: 'Query', postTopicById: { __typename?: 'PostTopic', id: string, title: string, slug: string, description?: string | null, postCount: number, createdAt: any } };

export type PostTopicsQueryVariables = Exact<{
  ids?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;


export type PostTopicsQuery = { __typename?: 'Query', postTopics: Array<{ __typename?: 'PostTopic', id: string, title: string, slug: string, description?: string | null, postCount: number, createdAt: any }> };

export type PostTopicCreateMutationVariables = Exact<{
  input: PostTopicCreateInput;
}>;


export type PostTopicCreateMutation = { __typename?: 'Mutation', postTopicCreate: { __typename?: 'PostTopic', id: string, title: string, slug: string, description?: string | null, postCount: number, createdAt: any } };

export type PostTopicUpdateMutationVariables = Exact<{
  input: PostTopicUpdateInput;
}>;


export type PostTopicUpdateMutation = { __typename?: 'Mutation', postTopicUpdate: { __typename?: 'PostTopic', id: string, title: string, slug: string, description?: string | null, postCount: number, createdAt: any } };

export type PostTopicDeleteMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type PostTopicDeleteMutation = { __typename?: 'Mutation', postTopicDelete: boolean };

export type SupportPostQueryVariables = Exact<{
  identifier: Scalars['String']['input'];
}>;


export type SupportPostQuery = { __typename?: 'Query', post: { __typename?: 'Post', identifier: string, slug: string, status: PostStatus, title: string, description?: string | null, content?: string | null, updatedAt: any, createdAt: any } };

export type SupportPostsQueryVariables = Exact<{
  paginationInputWithFilters?: InputMaybe<PaginationInputWithFilters>;
}>;


export type SupportPostsQuery = { __typename?: 'Query', posts: { __typename?: 'PagedPosts', pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, pagesTotal: number, page: number } | null, items: Array<{ __typename?: 'Post', identifier: string, slug: string, status: PostStatus, title: string, description?: string | null, content?: string | null, updatedAt: any, createdAt: any, topics?: Array<{ __typename?: 'PostTopic', id: string, title: string, slug: string }> | null }> } };

export type SupportPostTopicQueryVariables = Exact<{
  slug: Scalars['String']['input'];
  path?: InputMaybe<Scalars['String']['input']>;
  pagination?: InputMaybe<PaginationInput>;
}>;


export type SupportPostTopicQuery = { __typename?: 'Query', postTopic: { __typename?: 'PostTopicQueryResult', topic: { __typename?: 'PostTopic', id: string, title: string, slug: string, description?: string | null, postCount: number, createdAt: any }, subTopics?: Array<{ __typename?: 'PostTopic', id: string, title: string, slug: string, description?: string | null, postCount: number, createdAt: any }> | null, pagedPosts: { __typename?: 'PagedPosts', items: Array<{ __typename?: 'Post', id: string, identifier: string, slug: string, status: PostStatus, title: string, description?: string | null, content?: string | null, metadata?: any | null, updatedAt: any, createdAt: any }>, pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, pagesTotal: number, page: number } | null } } };

export type SupportTicketCreateMutationVariables = Exact<{
  input: SupportTicketCreateInput;
}>;


export type SupportTicketCreateMutation = { __typename?: 'Mutation', supportTicketCreate: { __typename?: 'SupportTicket', id: string, type: string, status: SupportTicketStatus, userEmailAddress: string, title: string, description?: string | null, comments: Array<{ __typename?: 'SupportTicketComment', content: string }> } };

export type SupportTicketsAdminQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInputWithFilters>;
  orderBy?: InputMaybe<OrderBy>;
}>;


export type SupportTicketsAdminQuery = { __typename?: 'Query', supportTicketsAdmin: { __typename?: 'PaginationSupportTicketResult', items: Array<{ __typename?: 'SupportTicket', id: string, identifier: string, status: SupportTicketStatus, type: string, title: string, userEmailAddress: string, assignedToProfileId?: string | null, createdAt: any, assignedToProfile?: { __typename?: 'PublicProfile', username: string, displayName?: string | null, imageUrls?: Array<{ __typename?: 'ImageObject', type: MediaObjectType, url: string, variant?: string | null }> | null } | null, comments: Array<{ __typename?: 'SupportTicketComment', id: string, source: SupportTicketCommentSource, visibility: SupportTicketCommentVisibility, content: string, contentType: RichContentFormat, createdAt: any, attachments?: Array<{ __typename?: 'MediaObject', type: MediaObjectType, url: string, variant?: string | null }> | null }> }>, pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForNextPage?: number | null, itemIndexForPreviousPage?: number | null, itemsPerPage: number, itemsTotal: number, page: number, pagesTotal: number } | null } };

export type SupportTicketAssignMutationVariables = Exact<{
  ticketId: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
}>;


export type SupportTicketAssignMutation = { __typename?: 'Mutation', supportTicketAssign: { __typename?: 'SupportTicket', id: string, assignedToProfileId?: string | null, assignedToProfile?: { __typename?: 'PublicProfile', username: string, displayName?: string | null, imageUrls?: Array<{ __typename?: 'ImageObject', type: MediaObjectType, url: string, variant?: string | null }> | null } | null } };

export type SupportTicketCommentCreateAdminMutationVariables = Exact<{
  input: SupportTicketCommentCreateInput;
}>;


export type SupportTicketCommentCreateAdminMutation = { __typename?: 'Mutation', supportTicketCommentCreateAdmin: { __typename?: 'SupportTicketComment', id: string, content: string, contentType: RichContentFormat, source: SupportTicketCommentSource, visibility: SupportTicketCommentVisibility, createdAt: any } };

export type SupportAllSupportProfilesQueryVariables = Exact<{ [key: string]: never; }>;


export type SupportAllSupportProfilesQuery = { __typename?: 'Query', supportAllSupportProfiles: Array<{ __typename?: 'PublicProfile', username: string, displayName?: string | null, imageUrls?: Array<{ __typename?: 'ImageObject', type: MediaObjectType, url: string, variant?: string | null }> | null }> };

export type WaitListsQueryVariables = Exact<{ [key: string]: never; }>;


export type WaitListsQuery = { __typename?: 'Query', waitLists: { __typename?: 'WaitListResult', pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForNextPage?: number | null, itemIndexForPreviousPage?: number | null, itemsPerPage: number, itemsTotal: number, page: number, pagesTotal: number } | null, items: Array<{ __typename?: 'WaitList', id: string, identifier: string, title: string, description?: string | null, updatedAt: any, createdAt: any }> } };

export type WaitListCreateMutationVariables = Exact<{
  data: WaitListCreationInput;
}>;


export type WaitListCreateMutation = { __typename?: 'Mutation', waitListCreate: { __typename?: 'WaitList', id: string, identifier: string, title: string, description?: string | null, updatedAt: any, createdAt: any } };

export type WaitListEntriesQueryVariables = Exact<{
  waitListIdentifier: Scalars['String']['input'];
  itemsPerPage?: Scalars['Int']['input'];
}>;


export type WaitListEntriesQuery = { __typename?: 'Query', waitListEntries: { __typename?: 'WaitListEntriesResult', pagination?: { __typename?: 'Pagination', itemIndex: number, itemIndexForNextPage?: number | null, itemIndexForPreviousPage?: number | null, itemsPerPage: number, itemsTotal: number, page: number, pagesTotal: number } | null, items: Array<{ __typename?: 'WaitListEntry', id: string, emailAddress: string, message?: string | null, userAgent?: string | null, countryCode?: string | null, referredBy?: string | null, contactedAt?: any | null, updatedAt: any, createdAt: any }> } };

export type WaitListEntryCreateMutationVariables = Exact<{
  emailAddress: Scalars['String']['input'];
}>;


export type WaitListEntryCreateMutation = { __typename?: 'Mutation', waitListEntryCreate: { __typename?: 'WaitListEntry', id: string, emailAddress: string } };

export type TaskCreatePortScanMutationVariables = Exact<{
  input: TaskPortScanInput;
}>;


export type TaskCreatePortScanMutation = { __typename?: 'Mutation', taskCreatePortScan: Array<{ __typename?: 'Task', id: string, groupdId?: string | null, regionId: string, lastResultId?: string | null, state: TaskState, priority: number, procedureType: AtlasProcedureType, procedureArguments: any, runAt?: any | null, attempts: number, maxAttempts: number, meta?: any | null, createdAt: any, updatedAt: any, assignments: Array<{ __typename?: 'TaskAssignment', id: string, attempt: number, updatedAt: any, createdAt: any, gridNode: { __typename?: 'GridNode', id: string, updatedAt: any, createdAt: any }, region: { __typename?: 'Region', name: string } }>, results: Array<{ __typename?: 'TaskResult', id: string, taskId: string, regionId?: string | null, clusterId?: string | null, gridNodeId?: string | null, type: TaskResultType, ranAt?: any | null, attempt: number, duration: number, result?: any | null, meta?: any | null, error?: any | null, createdAt: any, updatedAt: any, region?: { __typename?: 'Region', id: string, name: string, displayName: string, updatedAt: any, createdAt: any } | null, cluster?: { __typename?: 'Cluster', id: string, name: string, updatedAt: any, createdAt: any } | null }> }> };

export type TaskPortScanQueryVariables = Exact<{
  input: TaskInput;
}>;


export type TaskPortScanQuery = { __typename?: 'Query', task?: { __typename?: 'Task', id: string, groupdId?: string | null, regionId: string, lastResultId?: string | null, state: TaskState, priority: number, procedureType: AtlasProcedureType, procedureArguments: any, runAt?: any | null, attempts: number, maxAttempts: number, meta?: any | null, createdAt: any, updatedAt: any, assignments: Array<{ __typename?: 'TaskAssignment', id: string, attempt: number, updatedAt: any, createdAt: any, gridNode: { __typename?: 'GridNode', id: string, updatedAt: any, createdAt: any }, region: { __typename?: 'Region', name: string } }>, results: Array<{ __typename?: 'TaskResult', id: string, taskId: string, regionId?: string | null, clusterId?: string | null, gridNodeId?: string | null, type: TaskResultType, ranAt?: any | null, attempt: number, duration: number, result?: any | null, meta?: any | null, error?: any | null, createdAt: any, updatedAt: any, region?: { __typename?: 'Region', id: string, name: string, displayName: string, updatedAt: any, createdAt: any } | null, cluster?: { __typename?: 'Cluster', id: string, name: string, updatedAt: any, createdAt: any } | null }> } | null };

export type GridRegionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GridRegionsQuery = { __typename?: 'Query', gridRegions: Array<{ __typename?: 'Region', id: string, name: string, displayName: string, updatedAt: any, createdAt: any }> };


export const AccountRegistrationOrSignInCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountRegistrationOrSignInCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountRegistrationOrSignInCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountRegistrationOrSignInCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"authentication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scopeType"}},{"kind":"Field","name":{"kind":"Name","value":"currentChallenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengeType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<AccountRegistrationOrSignInCreateMutation, AccountRegistrationOrSignInCreateMutationVariables>;
export const AccountRegistrationCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountRegistrationComplete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountRegistrationCompleteInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountRegistrationComplete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AccountRegistrationCompleteMutation, AccountRegistrationCompleteMutationVariables>;
export const AccountSignInCompleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountSignInComplete"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountSignInComplete"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AccountSignInCompleteMutation, AccountSignInCompleteMutationVariables>;
export const AuthenticationCurrentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AuthenticationCurrent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"authenticationCurrent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scopeType"}},{"kind":"Field","name":{"kind":"Name","value":"currentChallenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengeType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AuthenticationCurrentQuery, AuthenticationCurrentQueryVariables>;
export const EmailVerificationDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailVerification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailVerification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"lastEmailSentAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authentication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scopeType"}},{"kind":"Field","name":{"kind":"Name","value":"currentChallenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengeType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<EmailVerificationQuery, EmailVerificationQueryVariables>;
export const EmailVerificationSendDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EmailVerificationSend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailVerificationSend"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"lastEmailSentAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authentication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scopeType"}},{"kind":"Field","name":{"kind":"Name","value":"currentChallenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengeType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<EmailVerificationSendMutation, EmailVerificationSendMutationVariables>;
export const EmailVerificationVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EmailVerificationVerify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EmailVerificationVerifyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailVerificationVerify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"verification"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"lastEmailSentAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"authentication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scopeType"}},{"kind":"Field","name":{"kind":"Name","value":"currentChallenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengeType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<EmailVerificationVerifyMutation, EmailVerificationVerifyMutationVariables>;
export const AccountPasswordVerifyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountPasswordVerify"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountPasswordVerifyInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountPasswordVerify"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"authentication"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"scopeType"}},{"kind":"Field","name":{"kind":"Name","value":"currentChallenge"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"challengeType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<AccountPasswordVerifyMutation, AccountPasswordVerifyMutationVariables>;
export const AccountSignOutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountSignOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountSignOut"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AccountSignOutMutation, AccountSignOutMutationVariables>;
export const AccountCurrentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountCurrent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountCurrent"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"givenName"}},{"kind":"Field","name":{"kind":"Name","value":"familyName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"primaryAccountEmail"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isVerified"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"currentSession"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currentProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusChangedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AccountCurrentQuery, AccountCurrentQueryVariables>;
export const AccountProfileUsernameValidateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountProfileUsernameValidate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountProfileUsernameValidate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}]}]}}]} as unknown as DocumentNode<AccountProfileUsernameValidateQuery, AccountProfileUsernameValidateQueryVariables>;
export const AccountProfileUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountProfileUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AccountProfileUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountProfileUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"givenName"}},{"kind":"Field","name":{"kind":"Name","value":"preferredName"}},{"kind":"Field","name":{"kind":"Name","value":"middleName"}},{"kind":"Field","name":{"kind":"Name","value":"familyName"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<AccountProfileUpdateMutation, AccountProfileUpdateMutationVariables>;
export const ProfilePublicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"ProfilePublic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"profilePublic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<ProfilePublicQuery, ProfilePublicQueryVariables>;
export const AccountAssignableRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountAssignableRoles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountAssignableRoles"}}]}}]} as unknown as DocumentNode<AccountAssignableRolesQuery, AccountAssignableRolesQueryVariables>;
export const AccountRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"statuses"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountRoles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"statuses"},"value":{"kind":"Variable","name":{"kind":"Name","value":"statuses"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAccountEmailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AccountRolesQuery, AccountRolesQueryVariables>;
export const AccountRoleRevokeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountRoleRevoke"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountRoleRevoke"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"roleId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"roleId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AccountRoleRevokeMutation, AccountRoleRevokeMutationVariables>;
export const AccountRoleGrantDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountRoleGrant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GrantAccessRoleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountRoleGrant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"profile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"expiresAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<AccountRoleGrantMutation, AccountRoleGrantMutationVariables>;
export const AccountsAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountsAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountsAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}}]}}]}}]}}]} as unknown as DocumentNode<AccountsAdminQuery, AccountsAdminQueryVariables>;
export const AccountByEmailAddressAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"AccountByEmailAddressAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountByEmailAddressAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"emailAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"profiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<AccountByEmailAddressAdminQuery, AccountByEmailAddressAdminQueryVariables>;
export const AccountDeleteAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"AccountDeleteAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accountDeleteAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"emailAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<AccountDeleteAdminMutation, AccountDeleteAdminMutationVariables>;
export const CommerceOrdersAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CommerceOrdersAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInputWithFilters"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commerceOrdersAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"batchIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"beneficiaryEmailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"fulfillmentSource"}},{"kind":"Field","name":{"kind":"Name","value":"fulfillmentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"holdOnShipping"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"lineItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commerceOrderId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"fulfilledQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"indexId"}},{"kind":"Field","name":{"kind":"Name","value":"productVariantId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"shippedQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"statusDescription"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"orderLogs"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commerceOrderId"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"authorizedAt"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAt"}},{"kind":"Field","name":{"kind":"Name","value":"capturedAt"}},{"kind":"Field","name":{"kind":"Name","value":"confirmedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"externalReferenceId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paymentMethod"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalResourceId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProcessorType"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentMethodCreditCard"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalResourceId"}},{"kind":"Field","name":{"kind":"Name","value":"billingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}},{"kind":"Field","name":{"kind":"Name","value":"cardType"}},{"kind":"Field","name":{"kind":"Name","value":"expirationMonth"}},{"kind":"Field","name":{"kind":"Name","value":"expirationYear"}},{"kind":"Field","name":{"kind":"Name","value":"last4"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProcessorType"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PaymentMethodAppleInAppPurchase"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"externalResourceId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProcessorType"}},{"kind":"Field","name":{"kind":"Name","value":"type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentProcessorType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusDescription"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletEntryId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"priceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"lineItemPrices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"indexId"}},{"kind":"Field","name":{"kind":"Name","value":"originalSubtotal"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalSubtotal"}},{"kind":"Field","name":{"kind":"Name","value":"shippingRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"breakdown"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeShipping"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"indexId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalShippingRate"}},{"kind":"Field","name":{"kind":"Name","value":"packageIndexId"}},{"kind":"Field","name":{"kind":"Name","value":"shippingRate"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"tax"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shipping"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shipments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cancelledAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdByAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"deliveredAt"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStatus"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"orderIndexId"}},{"kind":"Field","name":{"kind":"Name","value":"label"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"carrier"}},{"kind":"Field","name":{"kind":"Name","value":"labelId"}},{"kind":"Field","name":{"kind":"Name","value":"serviceType"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"trackingNumber"}},{"kind":"Field","name":{"kind":"Name","value":"trackingUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"orderSlip"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"storedObjectUrl"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shippedAt"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusDescription"}},{"kind":"Field","name":{"kind":"Name","value":"toAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByProfileId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shippingInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shippingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"statusDescription"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}}]}}]}}]}}]} as unknown as DocumentNode<CommerceOrdersAdminQuery, CommerceOrdersAdminQueryVariables>;
export const GetBagItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBagItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commerceCart"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"relationship"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"productBundle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productVariant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shippingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetBagItemsQuery, GetBagItemsQueryVariables>;
export const UpdateBagWithItemsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBagWithItems"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ShoppingBagItemInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commerceCartUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"items"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"relationship"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"productBundle"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"productVariant"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"shippingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]}}]} as unknown as DocumentNode<UpdateBagWithItemsMutation, UpdateBagWithItemsMutationVariables>;
export const EstimateOrderPriceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EstimateOrderPrice"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemIds"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commerceShoppingBagPriceEstimate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"itemIds"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemIds"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"lineItemPrices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"indexId"}},{"kind":"Field","name":{"kind":"Name","value":"originalSubtotal"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}}]}},{"kind":"Field","name":{"kind":"Name","value":"originalSubtotal"}},{"kind":"Field","name":{"kind":"Name","value":"shippingRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"originalAmount"}},{"kind":"Field","name":{"kind":"Name","value":"breakdown"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"freeShipping"}},{"kind":"Field","name":{"kind":"Name","value":"originalShippingRate"}},{"kind":"Field","name":{"kind":"Name","value":"shippingRate"}},{"kind":"Field","name":{"kind":"Name","value":"packageIndexId"}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"indexId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"tax"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shipping"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]}}]} as unknown as DocumentNode<EstimateOrderPriceQuery, EstimateOrderPriceQueryVariables>;
export const BagCheckoutDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"BagCheckout"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ShoppingBagCheckoutInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commerceShoppingBagCheckout"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"batchIdentifier"}},{"kind":"Field","name":{"kind":"Name","value":"holdOnShipping"}},{"kind":"Field","name":{"kind":"Name","value":"fulfillmentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"payment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"authorizedAt"}},{"kind":"Field","name":{"kind":"Name","value":"cancelledAt"}},{"kind":"Field","name":{"kind":"Name","value":"capturedAt"}},{"kind":"Field","name":{"kind":"Name","value":"confirmedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"externalReferenceId"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"paymentProcessorType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusDescription"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"walletEntryId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}},{"kind":"Field","name":{"kind":"Name","value":"priceInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"currencyCode"}},{"kind":"Field","name":{"kind":"Name","value":"originalSubtotal"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"lineItemPrices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"indexId"}},{"kind":"Field","name":{"kind":"Name","value":"originalSubtotal"}},{"kind":"Field","name":{"kind":"Name","value":"subtotal"}},{"kind":"Field","name":{"kind":"Name","value":"tax"}}]}},{"kind":"Field","name":{"kind":"Name","value":"shippingRate"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"originalAmount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tax"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shipping"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusDescription"}},{"kind":"Field","name":{"kind":"Name","value":"shippingInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"shippingAddress"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"company"}},{"kind":"Field","name":{"kind":"Name","value":"line1"}},{"kind":"Field","name":{"kind":"Name","value":"line2"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"postalCode"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"lineItems"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"indexId"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}},{"kind":"Field","name":{"kind":"Name","value":"fulfilledQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"shippedQuantity"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statusDescription"}},{"kind":"Field","name":{"kind":"Name","value":"productVariantId"}},{"kind":"Field","name":{"kind":"Name","value":"commerceOrderId"}}]}}]}}]}}]} as unknown as DocumentNode<BagCheckoutMutation, BagCheckoutMutationVariables>;
export const CommerceCheckoutSessionCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CommerceCheckoutSessionCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CommerceCheckoutSessionCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"commerceCheckoutSessionCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"orders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"paymentStatus"}}]}},{"kind":"Field","name":{"kind":"Name","value":"externalMetadata"}},{"kind":"Field","name":{"kind":"Name","value":"failedCount"}},{"kind":"Field","name":{"kind":"Name","value":"closedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<CommerceCheckoutSessionCreateMutation, CommerceCheckoutSessionCreateMutationVariables>;
export const ContactsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Contacts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInputWithFilters"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contacts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}}]}}]}}]}}]} as unknown as DocumentNode<ContactsQuery, ContactsQueryVariables>;
export const ContactDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Contact"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contact"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<ContactQuery, ContactQueryVariables>;
export const ContactCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContactCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<ContactCreateMutation, ContactCreateMutationVariables>;
export const ContactUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContactUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<ContactUpdateMutation, ContactUpdateMutationVariables>;
export const ContactFieldUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContactFieldUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"contactId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ContactFieldUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactFieldUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"contactId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"contactId"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"note"}},{"kind":"Field","name":{"kind":"Name","value":"fields"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<ContactFieldUpdateMutation, ContactFieldUpdateMutationVariables>;
export const ContactDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ContactDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"contactDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<ContactDeleteMutation, ContactDeleteMutationVariables>;
export const DataInteractionDatabasesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DataInteractionDatabases"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataInteractionDatabases"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"databaseName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}}]}}]}}]}}]} as unknown as DocumentNode<DataInteractionDatabasesQuery, DataInteractionDatabasesQueryVariables>;
export const DataInteractionDatabaseTableDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DataInteractionDatabaseTable"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"databaseName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tableName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataInteractionDatabaseTable"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"databaseName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"databaseName"}}},{"kind":"Argument","name":{"kind":"Name","value":"tableName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tableName"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"databaseName"}},{"kind":"Field","name":{"kind":"Name","value":"tableName"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isKey"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimaryKey"}},{"kind":"Field","name":{"kind":"Name","value":"keyTableName"}},{"kind":"Field","name":{"kind":"Name","value":"possibleValues"}},{"kind":"Field","name":{"kind":"Name","value":"isNullable"}},{"kind":"Field","name":{"kind":"Name","value":"isGenerated"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldName"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"tableName"}},{"kind":"Field","name":{"kind":"Name","value":"inverseFieldName"}},{"kind":"Field","name":{"kind":"Name","value":"inverseType"}},{"kind":"Field","name":{"kind":"Name","value":"inverseTableName"}}]}}]}}]}}]} as unknown as DocumentNode<DataInteractionDatabaseTableQuery, DataInteractionDatabaseTableQueryVariables>;
export const DataInteractionDatabaseTableMetricsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DataInteractionDatabaseTableMetrics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DataInteractionDatabaseTableMetricsQueryInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataInteractionDatabaseTableMetrics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timeInterval"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}}]}}]} as unknown as DocumentNode<DataInteractionDatabaseTableMetricsQuery, DataInteractionDatabaseTableMetricsQueryVariables>;
export const DataInteractionDatabaseTablesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DataInteractionDatabaseTables"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"databaseName"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataInteractionDatabaseTables"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"databaseName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"databaseName"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"databaseName"}},{"kind":"Field","name":{"kind":"Name","value":"tableName"}},{"kind":"Field","name":{"kind":"Name","value":"rowCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}}]}}]}}]}}]} as unknown as DocumentNode<DataInteractionDatabaseTablesQuery, DataInteractionDatabaseTablesQueryVariables>;
export const DataInteractionDatabaseTableRowsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"DataInteractionDatabaseTableRows"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"databaseName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tableName"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderBy"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ColumnFilterGroup"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dataInteractionDatabaseTableRows"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"databaseName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"databaseName"}}},{"kind":"Argument","name":{"kind":"Name","value":"tableName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tableName"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}},{"kind":"Argument","name":{"kind":"Name","value":"filters"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"}},{"kind":"Field","name":{"kind":"Name","value":"databaseName"}},{"kind":"Field","name":{"kind":"Name","value":"tableName"}},{"kind":"Field","name":{"kind":"Name","value":"rowCount"}},{"kind":"Field","name":{"kind":"Name","value":"columns"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"isKey"}},{"kind":"Field","name":{"kind":"Name","value":"isPrimaryKey"}},{"kind":"Field","name":{"kind":"Name","value":"keyTableName"}},{"kind":"Field","name":{"kind":"Name","value":"possibleValues"}},{"kind":"Field","name":{"kind":"Name","value":"isNullable"}},{"kind":"Field","name":{"kind":"Name","value":"isGenerated"}},{"kind":"Field","name":{"kind":"Name","value":"length"}}]}},{"kind":"Field","name":{"kind":"Name","value":"relations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fieldName"}},{"kind":"Field","name":{"kind":"Name","value":"tableName"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"inverseFieldName"}},{"kind":"Field","name":{"kind":"Name","value":"inverseType"}},{"kind":"Field","name":{"kind":"Name","value":"inverseTableName"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}}]}}]}}]}}]} as unknown as DocumentNode<DataInteractionDatabaseTableRowsQuery, DataInteractionDatabaseTableRowsQueryVariables>;
export const EmailCampaignsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailCampaigns"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInputWithFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailCampaigns"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"fromName"}},{"kind":"Field","name":{"kind":"Name","value":"fromEmail"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"currentStageIndexId"}},{"kind":"Field","name":{"kind":"Name","value":"deliveryStages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"indexId"}},{"kind":"Field","name":{"kind":"Name","value":"percentToSend"}},{"kind":"Field","name":{"kind":"Name","value":"stageStatus"}},{"kind":"Field","name":{"kind":"Name","value":"emailsSent"}},{"kind":"Field","name":{"kind":"Name","value":"percentSent"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"emailTemplateId"}},{"kind":"Field","name":{"kind":"Name","value":"emailTemplateContentId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedByAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdByAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}}]}}]}}]}}]} as unknown as DocumentNode<EmailCampaignsQuery, EmailCampaignsQueryVariables>;
export const EmailListsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EmailLists"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"emailLists"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"pagedEmailListEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"itemIndex"},"value":{"kind":"IntValue","value":"0"}},{"kind":"ObjectField","name":{"kind":"Name","value":"itemsPerPage"},"value":{"kind":"IntValue","value":"0"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedByProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByAccountId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<EmailListsQuery, EmailListsQueryVariables>;
export const EngagementEventCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EngagementEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEngagementEventInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"engagementEventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<EngagementEventCreateMutation, EngagementEventCreateMutationVariables>;
export const EngagementEventsCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EngagementEventsCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateEngagementEventInput"}}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"engagementEventsCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"inputs"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}}]}}]}}]} as unknown as DocumentNode<EngagementEventsCreateMutation, EngagementEventsCreateMutationVariables>;
export const EngagementOverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EngagementOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"engagementOverview"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uniqueDeviceIds"}},{"kind":"Field","name":{"kind":"Name","value":"views"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uniqueDeviceCount"}},{"kind":"Field","name":{"kind":"Name","value":"viewIdentifier"}}]}},{"kind":"Field","name":{"kind":"Name","value":"locations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"uniqueDeviceCount"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"latitude"}},{"kind":"Field","name":{"kind":"Name","value":"longitude"}}]}},{"kind":"Field","name":{"kind":"Name","value":"deviceCategoryPercentages"}}]}}]}}]} as unknown as DocumentNode<EngagementOverviewQuery, EngagementOverviewQueryVariables>;
export const PostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Posts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInputWithFilters"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdByProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"reacted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upvoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"downvoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteType"}},{"kind":"Field","name":{"kind":"Name","value":"reportedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reportStatus"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"latestRevisionId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}}]}}]}}]}}]} as unknown as DocumentNode<PostsQuery, PostsQueryVariables>;
export const PostsMineDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostsMine"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInputWithFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postsMine"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdByProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"reacted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upvoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"downvoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteType"}},{"kind":"Field","name":{"kind":"Name","value":"reportedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reportStatus"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"latestRevisionId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}}]}}]}}]}}]} as unknown as DocumentNode<PostsMineQuery, PostsMineQueryVariables>;
export const PostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Post"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdByProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"createdByProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"Field","name":{"kind":"Name","value":"reactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"reacted"}}]}},{"kind":"Field","name":{"kind":"Name","value":"upvoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"downvoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"voteType"}},{"kind":"Field","name":{"kind":"Name","value":"reportedCount"}},{"kind":"Field","name":{"kind":"Name","value":"reportStatus"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"latestRevisionId"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PostQuery, PostQueryVariables>;
export const PostCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postCreateAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"settings"}},{"kind":"Field","name":{"kind":"Name","value":"upvoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"downvoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PostCreateMutation, PostCreateMutationVariables>;
export const PostUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"settings"}},{"kind":"Field","name":{"kind":"Name","value":"upvoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"downvoteCount"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PostUpdateMutation, PostUpdateMutationVariables>;
export const PostDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<PostDeleteMutation, PostDeleteMutationVariables>;
export const PostVoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostVote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostVoteType"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postVote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type"}}}]}]}}]} as unknown as DocumentNode<PostVoteMutation, PostVoteMutationVariables>;
export const PostUnvoteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostUnvote"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postUnvote"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}}]}]}}]} as unknown as DocumentNode<PostUnvoteMutation, PostUnvoteMutationVariables>;
export const PostReactionCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostReactionCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postReactionCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<PostReactionCreateMutation, PostReactionCreateMutationVariables>;
export const PostReactionDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostReactionDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postReactionDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}}]}]}}]} as unknown as DocumentNode<PostReactionDeleteMutation, PostReactionDeleteMutationVariables>;
export const PostReactionProfilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostReactionProfiles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"postId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postReactionProfiles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"postId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"postId"}}},{"kind":"Argument","name":{"kind":"Name","value":"content"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"profileId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}}]}}]}}]}}]} as unknown as DocumentNode<PostReactionProfilesQuery, PostReactionProfilesQueryVariables>;
export const PostReportCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostReportCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostReportInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postReportCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<PostReportCreateMutation, PostReportCreateMutationVariables>;
export const PostTopicByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostTopicById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postTopicById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"postCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PostTopicByIdQuery, PostTopicByIdQueryVariables>;
export const PostTopicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PostTopics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ids"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postTopics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ids"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ids"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"postCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PostTopicsQuery, PostTopicsQueryVariables>;
export const PostTopicCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostTopicCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostTopicCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postTopicCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"postCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PostTopicCreateMutation, PostTopicCreateMutationVariables>;
export const PostTopicUpdateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostTopicUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PostTopicUpdateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postTopicUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"postCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<PostTopicUpdateMutation, PostTopicUpdateMutationVariables>;
export const PostTopicDeleteDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"PostTopicDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postTopicDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}]}}]} as unknown as DocumentNode<PostTopicDeleteMutation, PostTopicDeleteMutationVariables>;
export const SupportPostDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SupportPost"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"post"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"identifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"identifier"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<SupportPostQuery, SupportPostQueryVariables>;
export const SupportPostsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SupportPosts"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"paginationInputWithFilters"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInputWithFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"posts"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"paginationInputWithFilters"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"topics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<SupportPostsQuery, SupportPostsQueryVariables>;
export const SupportPostTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SupportPostTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"slug"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"path"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"slug"}}},{"kind":"Argument","name":{"kind":"Name","value":"path"},"value":{"kind":"Variable","name":{"kind":"Name","value":"path"}}},{"kind":"Argument","name":{"kind":"Name","value":"type"},"value":{"kind":"StringValue","value":"SupportArticle","block":false}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topic"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"postCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subTopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"postCount"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagedPosts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SupportPostTopicQuery, SupportPostTopicQueryVariables>;
export const SupportTicketCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SupportTicketCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SupportTicketCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"supportTicketCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"userEmailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"content"}}]}}]}}]}}]} as unknown as DocumentNode<SupportTicketCreateMutation, SupportTicketCreateMutationVariables>;
export const SupportTicketsAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SupportTicketsAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInputWithFilters"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"OrderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"supportTicketsAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"Variable","name":{"kind":"Name","value":"orderBy"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"userEmailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"attachments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}}]}}]}}]}}]} as unknown as DocumentNode<SupportTicketsAdminQuery, SupportTicketsAdminQueryVariables>;
export const SupportTicketAssignDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SupportTicketAssign"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"username"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"supportTicketAssign"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ticketId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticketId"}}},{"kind":"Argument","name":{"kind":"Name","value":"username"},"value":{"kind":"Variable","name":{"kind":"Name","value":"username"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToProfileId"}},{"kind":"Field","name":{"kind":"Name","value":"assignedToProfile"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}}]}}]}}]}}]} as unknown as DocumentNode<SupportTicketAssignMutation, SupportTicketAssignMutationVariables>;
export const SupportTicketCommentCreateAdminDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SupportTicketCommentCreateAdmin"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SupportTicketCommentCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"supportTicketCommentCreateAdmin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"content"}},{"kind":"Field","name":{"kind":"Name","value":"contentType"}},{"kind":"Field","name":{"kind":"Name","value":"source"}},{"kind":"Field","name":{"kind":"Name","value":"visibility"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<SupportTicketCommentCreateAdminMutation, SupportTicketCommentCreateAdminMutationVariables>;
export const SupportAllSupportProfilesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SupportAllSupportProfiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"supportAllSupportProfiles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"imageUrls"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"variant"}}]}}]}}]}}]} as unknown as DocumentNode<SupportAllSupportProfilesQuery, SupportAllSupportProfilesQueryVariables>;
export const WaitListsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WaitLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waitLists"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<WaitListsQuery, WaitListsQueryVariables>;
export const WaitListCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WaitListCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WaitListCreationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waitListCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"identifier"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<WaitListCreateMutation, WaitListCreateMutationVariables>;
export const WaitListEntriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WaitListEntries"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"waitListIdentifier"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"itemsPerPage"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},"defaultValue":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waitListEntries"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"itemsPerPage"},"value":{"kind":"Variable","name":{"kind":"Name","value":"itemsPerPage"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"waitListIdentifier"},"value":{"kind":"Variable","name":{"kind":"Name","value":"waitListIdentifier"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}}]}},{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}},{"kind":"Field","name":{"kind":"Name","value":"message"}},{"kind":"Field","name":{"kind":"Name","value":"userAgent"}},{"kind":"Field","name":{"kind":"Name","value":"countryCode"}},{"kind":"Field","name":{"kind":"Name","value":"referredBy"}},{"kind":"Field","name":{"kind":"Name","value":"contactedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]}}]} as unknown as DocumentNode<WaitListEntriesQuery, WaitListEntriesQueryVariables>;
export const WaitListEntryCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WaitListEntryCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"waitListEntryCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"emailAddress"},"value":{"kind":"Variable","name":{"kind":"Name","value":"emailAddress"}}},{"kind":"Argument","name":{"kind":"Name","value":"waitListIdentifier"},"value":{"kind":"StringValue","value":"earlyAccess","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"emailAddress"}}]}}]}}]} as unknown as DocumentNode<WaitListEntryCreateMutation, WaitListEntryCreateMutationVariables>;
export const TaskCreatePortScanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TaskCreatePortScan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskPortScanInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"taskCreatePortScan"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groupdId"}},{"kind":"Field","name":{"kind":"Name","value":"regionId"}},{"kind":"Field","name":{"kind":"Name","value":"lastResultId"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"procedureType"}},{"kind":"Field","name":{"kind":"Name","value":"procedureArguments"}},{"kind":"Field","name":{"kind":"Name","value":"runAt"}},{"kind":"Field","name":{"kind":"Name","value":"attempts"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"assignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attempt"}},{"kind":"Field","name":{"kind":"Name","value":"gridNode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"region"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"regionId"}},{"kind":"Field","name":{"kind":"Name","value":"region"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"clusterId"}},{"kind":"Field","name":{"kind":"Name","value":"cluster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gridNodeId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"ranAt"}},{"kind":"Field","name":{"kind":"Name","value":"attempt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TaskCreatePortScanMutation, TaskCreatePortScanMutationVariables>;
export const TaskPortScanDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TaskPortScan"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"TaskInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"task"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"groupdId"}},{"kind":"Field","name":{"kind":"Name","value":"regionId"}},{"kind":"Field","name":{"kind":"Name","value":"lastResultId"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"priority"}},{"kind":"Field","name":{"kind":"Name","value":"procedureType"}},{"kind":"Field","name":{"kind":"Name","value":"procedureArguments"}},{"kind":"Field","name":{"kind":"Name","value":"runAt"}},{"kind":"Field","name":{"kind":"Name","value":"attempts"}},{"kind":"Field","name":{"kind":"Name","value":"maxAttempts"}},{"kind":"Field","name":{"kind":"Name","value":"assignments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"attempt"}},{"kind":"Field","name":{"kind":"Name","value":"gridNode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"region"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"results"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"taskId"}},{"kind":"Field","name":{"kind":"Name","value":"regionId"}},{"kind":"Field","name":{"kind":"Name","value":"region"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"clusterId"}},{"kind":"Field","name":{"kind":"Name","value":"cluster"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"gridNodeId"}},{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"ranAt"}},{"kind":"Field","name":{"kind":"Name","value":"attempt"}},{"kind":"Field","name":{"kind":"Name","value":"duration"}},{"kind":"Field","name":{"kind":"Name","value":"result"}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"error"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]}}]} as unknown as DocumentNode<TaskPortScanQuery, TaskPortScanQueryVariables>;
export const GridRegionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GridRegions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gridRegions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"displayName"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<GridRegionsQuery, GridRegionsQueryVariables>;
export type GraphQLInputTypeMetadata =
  GraphQLInputScalarTypeMetadata |
  GraphQLInputEnumTypeMetadata |
  GraphQLInputObjectTypeMetadata;

interface BaseGraphQLInputTypeMetadata {
  readonly type: string;
  readonly description?: string;
}

export interface GraphQLInputScalarTypeMetadata extends BaseGraphQLInputTypeMetadata {
  readonly kind: 'scalar';
}

export interface GraphQLInputEnumTypeMetadata extends BaseGraphQLInputTypeMetadata {
  readonly kind: 'enum';
  readonly values: Array<string>;
}

export interface GraphQLInputObjectTypeMetadata extends BaseGraphQLInputTypeMetadata {
  readonly kind: 'object';
  readonly fields: ReadonlyArray<GraphQLInputObjectFieldMetadata>;
}

export type GraphQLInputObjectFieldMetadata =
  GraphQLInputObjectScalarFieldMetadata |
  GraphQLInputObjectEnumFieldMetadata |
  GraphQLInputObjectObjectFieldMetadata |
  GraphQLInputObjectListFieldMetadata |
  GraphQLInputObjectScalarListFieldMetadata;

interface BaseGraphQLInputObjectFieldMetadata {
  readonly name: string;
  readonly required: boolean;
  readonly validation?: ReadonlyArray<GraphQLInputObjectFieldValidationMetadata>;
}

export interface GraphQLInputObjectScalarFieldMetadata extends BaseGraphQLInputObjectFieldMetadata {
  readonly kind: 'scalar';
  readonly type: string;
}

export interface GraphQLInputObjectEnumFieldMetadata extends BaseGraphQLInputObjectFieldMetadata {
  readonly kind: 'enum';
  readonly type: GraphQLInputEnumTypeMetadata;
}

export interface GraphQLInputObjectObjectFieldMetadata extends BaseGraphQLInputObjectFieldMetadata {
  readonly kind: 'object';
  readonly type: GraphQLInputObjectTypeMetadata;
}

interface BaseGraphQLInputObjectListFieldMetadata extends BaseGraphQLInputObjectFieldMetadata {
  readonly kind: 'list';
  readonly allowsEmpty: boolean;
}

export interface GraphQLInputObjectListFieldMetadata extends BaseGraphQLInputObjectListFieldMetadata {
  readonly itemKind: 'enum' | 'object';
  readonly type: GraphQLInputTypeMetadata;
}

export interface GraphQLInputObjectScalarListFieldMetadata extends BaseGraphQLInputObjectListFieldMetadata {
  readonly itemKind: 'scalar';
  readonly type: string;
}

export interface GraphQLInputObjectFieldValidationMetadata {
  readonly type: string;
  readonly constraints?: ReadonlyArray<any>;
  readonly each?: boolean;
  readonly context?: any;
  readonly options?: any;
}

export namespace GraphQLInputTypes {

  export const TaskInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'TaskInput',
    fields: [
      {
        name: 'taskId',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isNotEmpty',
          },
          {
            type: 'isString',
          }
        ],
      }
    ],
  }

  export const TaskPortScanInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'TaskPortScanInput',
    fields: [
      {
        name: 'host',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isNotEmpty',
          },
          {
            type: 'isString',
          }
        ],
      },
      {
        name: 'ports',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isNotEmpty',
          },
          {
            type: 'arrayMinSize',
            constraints: [
              1
            ],
          },
          {
            type: 'isArray',
          }
        ],
      },
      {
        name: 'regions',
        kind: 'scalar',
        type: 'String',
        required: true,
      }
    ],
  }

  export const WaitListCreationInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'WaitListCreationInput',
    fields: [
      {
        name: 'identifier',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              16
            ],
          }
        ],
      },
      {
        name: 'title',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              256
            ],
          }
        ],
      },
      {
        name: 'description',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              512
            ],
          }
        ],
      },
      {
        name: 'emailAutomationKey',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              64
            ],
          }
        ],
      }
    ],
  }

  export const SupportTicketCommentVisibility: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'SupportTicketCommentVisibility',
    values: [
      'Public',
      'Internal'
    ],
  }

  export const SupportTicketCommentCreateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'SupportTicketCommentCreateInput',
    fields: [
      {
        name: 'ticketId',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isUuid',
          }
        ],
      },
      {
        name: 'content',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'contentType',
        kind: 'enum',
        type: GraphQLInputTypes.RichContentFormat,
        required: false,
      },
      {
        name: 'replyToCommentId',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isUuid',
          }
        ],
      },
      {
        name: 'visibility',
        kind: 'enum',
        type: GraphQLInputTypes.SupportTicketCommentVisibility,
        required: false,
      }
    ],
  }

  export const SupportTicketCreateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'SupportTicketCreateInput',
    fields: [
      {
        name: 'title',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              256
            ],
          }
        ],
      },
      {
        name: 'description',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'type',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              36
            ],
          },
          {
            type: 'isIn',
            constraints: [
              ["Contact","SupportArticleFeedback"]
            ],
          }
        ],
      },
      {
        name: 'emailAddress',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isEmail',
          }
        ],
      },
      {
        name: 'initialComment',
        kind: 'object',
        type: GraphQLInputTypes.SupportTicketCommentCreateInput,
        required: false,
      }
    ],
  }

  export const PostTopicUpdateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'PostTopicUpdateInput',
    fields: [
      {
        name: 'id',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isUuid',
          }
        ],
      },
      {
        name: 'title',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              64
            ],
          }
        ],
      },
      {
        name: 'description',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              1024
            ],
          }
        ],
      },
      {
        name: 'slug',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              160
            ],
          }
        ],
      }
    ],
  }

  export const PostTopicCreateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'PostTopicCreateInput',
    fields: [
      {
        name: 'title',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              64
            ],
          }
        ],
      },
      {
        name: 'description',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              1024
            ],
          }
        ],
      },
      {
        name: 'type',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isIn',
            constraints: [
              ["Principle","Idea","SupportArticle"]
            ],
          },
          {
            type: 'maxLength',
            constraints: [
              24
            ],
          }
        ],
      },
      {
        name: 'slug',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              160
            ],
          }
        ],
      },
      {
        name: 'parentId',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isUuid',
          }
        ],
      },
      {
        name: 'position',
        kind: 'scalar',
        type: 'Float',
        required: false,
        validation: [
          {
            type: 'isInt',
          }
        ],
      }
    ],
  }

  export const PostReportInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'PostReportInput',
    fields: [
      {
        name: 'postId',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isUuid',
          }
        ],
      },
      {
        name: 'commentId',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isUuid',
          }
        ],
      },
      {
        name: 'reason',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              256
            ],
          }
        ],
      },
      {
        name: 'note',
        kind: 'scalar',
        type: 'String',
        required: false,
      }
    ],
  }

  export const PostVoteType: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'PostVoteType',
    values: [
      'Upvote',
      'Downvote'
    ],
  }

  export const PostUpdateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'PostUpdateInput',
    fields: [
      {
        name: 'title',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              1024
            ],
          }
        ],
      },
      {
        name: 'type',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isIn',
            constraints: [
              ["Principle","Idea","SupportArticle"]
            ],
          },
          {
            type: 'maxLength',
            constraints: [
              24
            ],
          }
        ],
      },
      {
        name: 'slug',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              160
            ],
          }
        ],
      },
      {
        name: 'description',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'content',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'contentType',
        kind: 'enum',
        type: GraphQLInputTypes.RichContentFormat,
        required: false,
      },
      {
        name: 'publishedAt',
        kind: 'scalar',
        type: 'DateTimeISO',
        required: false,
      },
      {
        name: 'allowComment',
        kind: 'scalar',
        type: 'Boolean',
        required: false,
      },
      {
        name: 'allowVote',
        kind: 'scalar',
        type: 'Boolean',
        required: false,
      },
      {
        name: 'allowDownvote',
        kind: 'scalar',
        type: 'Boolean',
        required: false,
      },
      {
        name: 'allowReaction',
        kind: 'scalar',
        type: 'Boolean',
        required: false,
      },
      {
        name: 'metadata',
        kind: 'scalar',
        type: 'JSON',
        required: false,
      }
    ],
  }

  export const RichContentFormat: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'RichContentFormat',
    values: [
      'Markdown',
      'Html',
      'PlainText'
    ],
  }

  export const PostStatus: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'PostStatus',
    values: [
      'Draft',
      'Published',
      'Deleted'
    ],
  }

  export const PostCreateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'PostCreateInput',
    fields: [
      {
        name: 'status',
        kind: 'enum',
        type: GraphQLInputTypes.PostStatus,
        required: false,
        validation: [
          {
            type: 'isEnum',
            constraints: [
              {"Draft":"Draft","Published":"Published","Deleted":"Deleted"},
              ["Draft","Published","Deleted"]
            ],
          }
        ],
      },
      {
        name: 'title',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              1024
            ],
          }
        ],
      },
      {
        name: 'type',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isIn',
            constraints: [
              ["Principle","Idea","SupportArticle"]
            ],
          },
          {
            type: 'maxLength',
            constraints: [
              24
            ],
          }
        ],
      },
      {
        name: 'slug',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              160
            ],
          }
        ],
      },
      {
        name: 'description',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'content',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'contentType',
        kind: 'enum',
        type: GraphQLInputTypes.RichContentFormat,
        required: false,
      },
      {
        name: 'topicIds',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'arrayUnique',
          },
          {
            type: 'isArray',
          }
        ],
      },
      {
        name: 'allowComment',
        kind: 'scalar',
        type: 'Boolean',
        required: false,
      },
      {
        name: 'allowVote',
        kind: 'scalar',
        type: 'Boolean',
        required: false,
      },
      {
        name: 'allowDownvote',
        kind: 'scalar',
        type: 'Boolean',
        required: false,
      },
      {
        name: 'allowReaction',
        kind: 'scalar',
        type: 'Boolean',
        required: false,
      },
      {
        name: 'metadata',
        kind: 'scalar',
        type: 'JSON',
        required: false,
      }
    ],
  }

  export const EngagementEventContext: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'EngagementEventContext',
    fields: [
      {
        name: 'viewIdentifier',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'viewTitle',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'previousViewIdentifier',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'previousViewTitle',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'referrer',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'loadDurationInMilliseconds',
        kind: 'scalar',
        type: 'Int',
        required: false,
      },
      {
        name: 'viewDurationInMilliseconds',
        kind: 'scalar',
        type: 'Int',
        required: false,
      },
      {
        name: 'previousViewDurationInMilliseconds',
        kind: 'scalar',
        type: 'Int',
        required: false,
      },
      {
        name: 'sessionDurationInMilliseconds',
        kind: 'scalar',
        type: 'Int',
        required: false,
      }
    ],
  }

  export const ClientProperties: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'ClientProperties',
    fields: [
      {
        name: 'environment',
        kind: 'scalar',
        type: 'String',
        required: false,
      }
    ],
  }

  export const DeviceOrientation: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'DeviceOrientation',
    values: [
      'Portrait',
      'Landscape',
      'NotAvailable'
    ],
  }

  export const DeviceProperties: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'DeviceProperties',
    fields: [
      {
        name: 'id',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isUuid',
          }
        ],
      },
      {
        name: 'operatingSystemName',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'operatingSystemVersion',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'cpu',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'memory',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'resolution',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'model',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'orientation',
        kind: 'enum',
        type: GraphQLInputTypes.DeviceOrientation,
        required: false,
      }
    ],
  }

  export const CreateEngagementEventInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'CreateEngagementEventInput',
    fields: [
      {
        name: 'name',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              64
            ],
          }
        ],
      },
      {
        name: 'deviceProperties',
        kind: 'object',
        type: GraphQLInputTypes.DeviceProperties,
        required: true,
      },
      {
        name: 'clientProperties',
        kind: 'object',
        type: GraphQLInputTypes.ClientProperties,
        required: false,
      },
      {
        name: 'locale',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isLocale',
          }
        ],
      },
      {
        name: 'eventContext',
        kind: 'object',
        type: GraphQLInputTypes.EngagementEventContext,
        required: false,
      }
    ],
  }

  export const ColumnFilterGroupOperator: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'ColumnFilterGroupOperator',
    values: [
      'And',
      'Or'
    ],
  }

  export const ColumnFilterGroup: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'ColumnFilterGroup',
    fields: [
      {
        name: 'operator',
        kind: 'enum',
        type: GraphQLInputTypes.ColumnFilterGroupOperator,
        required: false,
      },
      {
        name: 'conditions',
        kind: 'object',
        type: GraphQLInputTypes.ColumnFilter,
        required: true,
      },
      {
        name: 'filters',
        kind: 'object',
        type: GraphQLInputTypes.ColumnFilterGroup,
        required: true,
      }
    ],
  }

  export const TimeInterval: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'TimeInterval',
    values: [
      'Hour',
      'HourOfDay',
      'Day',
      'DayOfWeek',
      'DayOfMonth',
      'Month',
      'MonthOfYear',
      'Quarter',
      'Year'
    ],
  }

  export const DataInteractionDatabaseTableMetricsQueryInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'DataInteractionDatabaseTableMetricsQueryInput',
    fields: [
      {
        name: 'columnName',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'startTime',
        kind: 'scalar',
        type: 'DateTimeISO',
        required: false,
      },
      {
        name: 'endTime',
        kind: 'scalar',
        type: 'DateTimeISO',
        required: false,
      },
      {
        name: 'timeIntervals',
        kind: 'enum',
        type: GraphQLInputTypes.TimeInterval,
        required: true,
        validation: [
          {
            type: 'arrayNotEmpty',
          },
          {
            type: 'isArray',
          }
        ],
      },
      {
        name: 'tableName',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'databaseName',
        kind: 'scalar',
        type: 'String',
        required: true,
      }
    ],
  }

  export const ListEntryAction: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'ListEntryAction',
    values: [
      'Add',
      'Remove',
      'Update'
    ],
  }

  export const ContactFieldUpdateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'ContactFieldUpdateInput',
    fields: [
      {
        name: 'action',
        kind: 'enum',
        type: GraphQLInputTypes.ListEntryAction,
        required: true,
      },
      {
        name: 'id',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'label',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              256
            ],
          }
        ],
      },
      {
        name: 'value',
        kind: 'scalar',
        type: 'JSON',
        required: false,
      },
      {
        name: 'type',
        kind: 'enum',
        type: GraphQLInputTypes.ContactFieldType,
        required: false,
      }
    ],
  }

  export const ContactUpdateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'ContactUpdateInput',
    fields: [
      {
        name: 'id',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'name',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              64
            ],
          }
        ],
      },
      {
        name: 'source',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              64
            ],
          }
        ],
      },
      {
        name: 'note',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              512
            ],
          }
        ],
      },
      {
        name: 'metadata',
        kind: 'scalar',
        type: 'JSON',
        required: false,
      }
    ],
  }

  export const ContactFieldType: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'ContactFieldType',
    values: [
      'EmailAddress',
      'PhoneNumber',
      'StreetAddress'
    ],
  }

  export const ContactFieldCreateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'ContactFieldCreateInput',
    fields: [
      {
        name: 'type',
        kind: 'enum',
        type: GraphQLInputTypes.ContactFieldType,
        required: true,
        validation: [
          {
            type: 'isEnum',
            constraints: [
              {"EmailAddress":"EmailAddress","PhoneNumber":"PhoneNumber","StreetAddress":"StreetAddress"},
              ["EmailAddress","PhoneNumber","StreetAddress"]
            ],
          }
        ],
      },
      {
        name: 'label',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              256
            ],
          }
        ],
      },
      {
        name: 'value',
        kind: 'scalar',
        type: 'JSON',
        required: true,
      }
    ],
  }

  export const ContactType: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'ContactType',
    values: [
      'Person',
      'Company'
    ],
  }

  export const ContactCreateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'ContactCreateInput',
    fields: [
      {
        name: 'name',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              64
            ],
          }
        ],
      },
      {
        name: 'source',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              64
            ],
          }
        ],
      },
      {
        name: 'type',
        kind: 'enum',
        type: GraphQLInputTypes.ContactType,
        required: true,
        validation: [
          {
            type: 'isEnum',
            constraints: [
              {"Person":"Person","Company":"Company"},
              ["Person","Company"]
            ],
          }
        ],
      },
      {
        name: 'note',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              512
            ],
          }
        ],
      },
      {
        name: 'metadata',
        kind: 'scalar',
        type: 'JSON',
        required: false,
      },
      {
        name: 'fields',
        kind: 'object',
        type: GraphQLInputTypes.ContactFieldCreateInput,
        required: true,
      }
    ],
  }

  export const CommerceCheckoutSessionCreateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'CommerceCheckoutSessionCreateInput',
    fields: [
      {
        name: 'itemIds',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'arrayUnique',
          },
          {
            type: 'arrayNotEmpty',
          }
        ],
      },
      {
        name: 'emailAddress',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'paymentProcessorType',
        kind: 'enum',
        type: GraphQLInputTypes.PaymentProcessorType,
        required: true,
      }
    ],
  }

  export const PaymentMethodInputCreditCard: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'PaymentMethodInputCreditCard',
    fields: [
      {
        name: 'cardNumber',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'cardholderName',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'expirationMonth',
        kind: 'scalar',
        type: 'Int',
        required: true,
      },
      {
        name: 'expirationYear',
        kind: 'scalar',
        type: 'Int',
        required: true,
      },
      {
        name: 'cvc',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'billingAddress',
        kind: 'object',
        type: GraphQLInputTypes.StreetAddressInput,
        required: true,
      }
    ],
  }

  export const PaymentProcessorType: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'PaymentProcessorType',
    values: [
      'StripeProxy',
      'StripeEmbedded',
      'AppleInAppPurchase'
    ],
  }

  export const PaymentMethodType: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'PaymentMethodType',
    values: [
      'CreditCard',
      'AppleInAppPurchase'
    ],
  }

  export const PaymentMethodInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'PaymentMethodInput',
    fields: [
      {
        name: 'type',
        kind: 'enum',
        type: GraphQLInputTypes.PaymentMethodType,
        required: true,
      },
      {
        name: 'paymentProcessorType',
        kind: 'enum',
        type: GraphQLInputTypes.PaymentProcessorType,
        required: true,
      },
      {
        name: 'creditCard',
        kind: 'object',
        type: GraphQLInputTypes.PaymentMethodInputCreditCard,
        required: false,
      }
    ],
  }

  export const CreateOrderPaymentMethodInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'CreateOrderPaymentMethodInput',
    fields: [
      {
        name: 'walletEntryId',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'newPaymentMethod',
        kind: 'object',
        type: GraphQLInputTypes.PaymentMethodInput,
        required: false,
      },
      {
        name: 'saveToWalletAs',
        kind: 'scalar',
        type: 'String',
        required: false,
      }
    ],
  }

  export const ShoppingBagCheckoutInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'ShoppingBagCheckoutInput',
    fields: [
      {
        name: 'itemIds',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'arrayUnique',
          },
          {
            type: 'arrayNotEmpty',
          }
        ],
      },
      {
        name: 'emailAddress',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'paymentMethod',
        kind: 'object',
        type: GraphQLInputTypes.CreateOrderPaymentMethodInput,
        required: true,
      }
    ],
  }

  export const ShoppingBagEditionAction: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'ShoppingBagEditionAction',
    values: [
      'IncreaseQuantity',
      'DecreaseQuantity',
      'SetQuantity',
      'RemoveItem',
      'AddItem',
      'UpdateItem'
    ],
  }

  export const StreetAddressInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'StreetAddressInput',
    fields: [
      {
        name: 'company',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'line1',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'line2',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'city',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'state',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'postalCode',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'country',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'firstName',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'lastName',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'phoneNumber',
        kind: 'scalar',
        type: 'String',
        required: false,
      }
    ],
  }

  export const ShoppingBagItemInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'ShoppingBagItemInput',
    fields: [
      {
        name: 'id',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'productVariantId',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isUuid',
          }
        ],
      },
      {
        name: 'quantity',
        kind: 'scalar',
        type: 'Float',
        required: false,
        validation: [
          {
            type: 'isInt',
          }
        ],
      },
      {
        name: 'productBundleId',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isUuid',
          }
        ],
      },
      {
        name: 'relationship',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isIn',
            constraints: [
              ["Spouse","Self","Parent","Child","Friend","Family","Co-Worker","Other"]
            ],
          }
        ],
      },
      {
        name: 'emailAddress',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isEmail',
          }
        ],
      },
      {
        name: 'shippingAddress',
        kind: 'object',
        type: GraphQLInputTypes.StreetAddressInput,
        required: false,
      },
      {
        name: 'firstName',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'lastName',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'bagItemGroupKey',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'action',
        kind: 'enum',
        type: GraphQLInputTypes.ShoppingBagEditionAction,
        required: true,
      }
    ],
  }

  export const ColumnFilterConditionOperator: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'ColumnFilterConditionOperator',
    values: [
      'Equal',
      'NotEqual',
      'GreaterThan',
      'GreaterThanOrEqual',
      'LessThan',
      'LessThanOrEqual',
      'Like',
      'NotLike',
      'In',
      'NotIn',
      'IsNull',
      'IsNotNull'
    ],
  }

  export const ColumnFilter: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'ColumnFilter',
    fields: [
      {
        name: 'operator',
        kind: 'enum',
        type: GraphQLInputTypes.ColumnFilterConditionOperator,
        required: true,
      },
      {
        name: 'caseSensitive',
        kind: 'scalar',
        type: 'Boolean',
        required: false,
      },
      {
        name: 'column',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'value',
        kind: 'scalar',
        type: 'JSON',
        required: true,
      }
    ],
  }

  export const PaginationInputWithFilters: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'PaginationInputWithFilters',
    fields: [
      {
        name: 'itemsPerPage',
        kind: 'scalar',
        type: 'Int',
        required: true,
      },
      {
        name: 'itemIndex',
        kind: 'scalar',
        type: 'Int',
        required: false,
      },
      {
        name: 'filters',
        kind: 'object',
        type: GraphQLInputTypes.ColumnFilter,
        required: true,
      }
    ],
  }

  export const PaginationInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'PaginationInput',
    fields: [
      {
        name: 'itemsPerPage',
        kind: 'scalar',
        type: 'Int',
        required: true,
      },
      {
        name: 'itemIndex',
        kind: 'scalar',
        type: 'Int',
        required: false,
      }
    ],
  }

  export const GrantAccessRoleInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'GrantAccessRoleInput',
    fields: [
      {
        name: 'expiresAt',
        kind: 'scalar',
        type: 'DateTimeISO',
        required: false,
      },
      {
        name: 'type',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'emailAddress',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isEmail',
          }
        ],
      },
      {
        name: 'username',
        kind: 'scalar',
        type: 'String',
        required: true,
      }
    ],
  }

  export const OrderByDirection: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'OrderByDirection',
    values: [
      'Ascending',
      'Descending'
    ],
  }

  export const OrderBy: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'OrderBy',
    fields: [
      {
        name: 'key',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'direction',
        kind: 'enum',
        type: GraphQLInputTypes.OrderByDirection,
        required: false,
      }
    ],
  }

  export const AccountProfileUpdateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'AccountProfileUpdateInput',
    fields: [
      {
        name: 'username',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isLength',
            constraints: [
              3,
              32
            ],
          },
          {
            type: 'isString',
          }
        ],
      },
      {
        name: 'displayName',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              128
            ],
          }
        ],
      },
      {
        name: 'givenName',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              128
            ],
          }
        ],
      },
      {
        name: 'familyName',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              128
            ],
          }
        ],
      },
      {
        name: 'middleName',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              128
            ],
          }
        ],
      },
      {
        name: 'preferredName',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              128
            ],
          }
        ],
      },
      {
        name: 'phoneNumber',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isPhoneNumber',
          }
        ],
      },
      {
        name: 'birthday',
        kind: 'scalar',
        type: 'DateTimeISO',
        required: false,
        validation: [
          {
            type: 'isDate',
          }
        ],
      },
      {
        name: 'gender',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'maxLength',
            constraints: [
              32
            ],
          }
        ],
      }
    ],
  }

  export const AccountPasswordVerifyInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'AccountPasswordVerifyInput',
    fields: [
      {
        name: 'password',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isNotEmpty',
          }
        ],
      }
    ],
  }

  export const EmailVerificationVerifyInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'EmailVerificationVerifyInput',
    fields: [
      {
        name: 'code',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isNotEmpty',
          }
        ],
      }
    ],
  }

  export const AccountEncryptionConfiguration: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'AccountEncryptionConfiguration',
    fields: [
      {
        name: 'transitKeyId',
        kind: 'scalar',
        type: 'String',
        required: true,
      },
      {
        name: 'publicKey',
        kind: 'scalar',
        type: 'String',
        required: true,
      }
    ],
  }

  export const AccountRegistrationCompleteInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'AccountRegistrationCompleteInput',
    fields: [
      {
        name: 'password',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'minLength',
            constraints: [
              8
            ],
          },
          {
            type: 'maxLength',
            constraints: [
              90
            ],
          }
        ],
      },
      {
        name: 'username',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isLength',
            constraints: [
              3,
              32
            ],
          }
        ],
      },
      {
        name: 'displayName',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isLength',
            constraints: [
              3,
              32
            ],
          }
        ],
      },
      {
        name: 'givenName',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'familyName',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'phoneNumber',
        kind: 'scalar',
        type: 'String',
        required: false,
        validation: [
          {
            type: 'isPhoneNumber',
          }
        ],
      },
      {
        name: 'encryptionConfiguration',
        kind: 'object',
        type: GraphQLInputTypes.AccountEncryptionConfiguration,
        required: false,
      }
    ],
  }

  export const AccountRegistrationOrSignInCreateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'AccountRegistrationOrSignInCreateInput',
    fields: [
      {
        name: 'emailAddress',
        kind: 'scalar',
        type: 'String',
        required: true,
        validation: [
          {
            type: 'isEmail',
          }
        ],
      }
    ],
  }
}

export interface GraphQLOperationMetadata<DocumentType> {
  readonly operation: string;
  readonly operationType: 'query' | 'mutation' | 'subscription';
  readonly document: DocumentType;
  readonly parameters?: ReadonlyArray<GraphQLOperationParameterMetadata>;
}

export type GraphQLOperationParameterMetadata =
  GraphQLOperationScalarParameterMetadata |
  GraphQLOperationUnitParameterMetadata |
  GraphQLOperationListParameterMetadata |
  GraphQLOperationScalarListParameterMetadata;

interface BaseGraphQLOperationParameterMetadata {
  readonly parameter: string;
  readonly required: boolean;
}

export interface GraphQLOperationScalarParameterMetadata extends BaseGraphQLOperationParameterMetadata {
  readonly kind: 'scalar';
  readonly type: string;
}

export interface GraphQLOperationUnitParameterMetadata extends BaseGraphQLOperationParameterMetadata {
  readonly kind: 'enum' | 'object';
  readonly type: GraphQLInputTypeMetadata;
}

interface BaseGraphQLOperationListParameterMetadata extends BaseGraphQLOperationParameterMetadata {
  readonly kind: 'list';
  readonly allowsEmpty: boolean;
}

export interface GraphQLOperationListParameterMetadata extends BaseGraphQLOperationListParameterMetadata {
  readonly itemKind: 'enum' | 'object';
  readonly type: GraphQLInputTypeMetadata;
}

export interface GraphQLOperationScalarListParameterMetadata extends BaseGraphQLOperationListParameterMetadata {
  readonly itemKind: 'scalar';
  readonly type: string;
}

export const AccountRegistrationOrSignInCreateOperation: GraphQLOperationMetadata<typeof AccountRegistrationOrSignInCreateDocument> = {
  operation: 'AccountRegistrationOrSignInCreate',
  operationType: 'mutation',
  document: AccountRegistrationOrSignInCreateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.AccountRegistrationOrSignInCreateInput,
    },
  ],
}
  
export const AccountRegistrationCompleteOperation: GraphQLOperationMetadata<typeof AccountRegistrationCompleteDocument> = {
  operation: 'AccountRegistrationComplete',
  operationType: 'mutation',
  document: AccountRegistrationCompleteDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.AccountRegistrationCompleteInput,
    },
  ],
}
  
export const EmailVerificationVerifyOperation: GraphQLOperationMetadata<typeof EmailVerificationVerifyDocument> = {
  operation: 'EmailVerificationVerify',
  operationType: 'mutation',
  document: EmailVerificationVerifyDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.EmailVerificationVerifyInput,
    },
  ],
}
  
export const AccountPasswordVerifyOperation: GraphQLOperationMetadata<typeof AccountPasswordVerifyDocument> = {
  operation: 'AccountPasswordVerify',
  operationType: 'mutation',
  document: AccountPasswordVerifyDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.AccountPasswordVerifyInput,
    },
  ],
}
  
export const AccountProfileUsernameValidateOperation: GraphQLOperationMetadata<typeof AccountProfileUsernameValidateDocument> = {
  operation: 'AccountProfileUsernameValidate',
  operationType: 'query',
  document: AccountProfileUsernameValidateDocument,
  parameters: [
    {
      parameter: 'username',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const AccountProfileUpdateOperation: GraphQLOperationMetadata<typeof AccountProfileUpdateDocument> = {
  operation: 'AccountProfileUpdate',
  operationType: 'mutation',
  document: AccountProfileUpdateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.AccountProfileUpdateInput,
    },
  ],
}
  
export const ProfilePublicOperation: GraphQLOperationMetadata<typeof ProfilePublicDocument> = {
  operation: 'ProfilePublic',
  operationType: 'query',
  document: ProfilePublicDocument,
  parameters: [
    {
      parameter: 'username',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const AccountRolesOperation: GraphQLOperationMetadata<typeof AccountRolesDocument> = {
  operation: 'AccountRoles',
  operationType: 'query',
  document: AccountRolesDocument,
  parameters: [
    {
      parameter: 'statuses',
      required: false,
      kind: 'list',
      itemKind: 'scalar',
      type: 'String',
      allowsEmpty: false,
    },
    {
      parameter: 'orderBy',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.OrderBy,
    },
  ],
}
  
export const AccountRoleRevokeOperation: GraphQLOperationMetadata<typeof AccountRoleRevokeDocument> = {
  operation: 'AccountRoleRevoke',
  operationType: 'mutation',
  document: AccountRoleRevokeDocument,
  parameters: [
    {
      parameter: 'roleId',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const AccountRoleGrantOperation: GraphQLOperationMetadata<typeof AccountRoleGrantDocument> = {
  operation: 'AccountRoleGrant',
  operationType: 'mutation',
  document: AccountRoleGrantDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.GrantAccessRoleInput,
    },
  ],
}
  
export const AccountsAdminOperation: GraphQLOperationMetadata<typeof AccountsAdminDocument> = {
  operation: 'AccountsAdmin',
  operationType: 'query',
  document: AccountsAdminDocument,
  parameters: [
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInput,
    },
  ],
}
  
export const AccountByEmailAddressAdminOperation: GraphQLOperationMetadata<typeof AccountByEmailAddressAdminDocument> = {
  operation: 'AccountByEmailAddressAdmin',
  operationType: 'query',
  document: AccountByEmailAddressAdminDocument,
  parameters: [
    {
      parameter: 'emailAddress',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const AccountDeleteAdminOperation: GraphQLOperationMetadata<typeof AccountDeleteAdminDocument> = {
  operation: 'AccountDeleteAdmin',
  operationType: 'mutation',
  document: AccountDeleteAdminDocument,
  parameters: [
    {
      parameter: 'emailAddress',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const CommerceOrdersAdminOperation: GraphQLOperationMetadata<typeof CommerceOrdersAdminDocument> = {
  operation: 'CommerceOrdersAdmin',
  operationType: 'query',
  document: CommerceOrdersAdminDocument,
  parameters: [
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInputWithFilters,
    },
    {
      parameter: 'orderBy',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.OrderBy,
    },
  ],
}
  
export const UpdateBagWithItemsOperation: GraphQLOperationMetadata<typeof UpdateBagWithItemsDocument> = {
  operation: 'UpdateBagWithItems',
  operationType: 'mutation',
  document: UpdateBagWithItemsDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'list',
      itemKind: 'object',
      type: GraphQLInputTypes.ShoppingBagItemInput,
      allowsEmpty: false,
    },
  ],
}
  
export const EstimateOrderPriceOperation: GraphQLOperationMetadata<typeof EstimateOrderPriceDocument> = {
  operation: 'EstimateOrderPrice',
  operationType: 'query',
  document: EstimateOrderPriceDocument,
  parameters: [
    {
      parameter: 'itemIds',
      required: true,
      kind: 'list',
      itemKind: 'scalar',
      type: 'String',
      allowsEmpty: false,
    },
  ],
}
  
export const BagCheckoutOperation: GraphQLOperationMetadata<typeof BagCheckoutDocument> = {
  operation: 'BagCheckout',
  operationType: 'mutation',
  document: BagCheckoutDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.ShoppingBagCheckoutInput,
    },
  ],
}
  
export const CommerceCheckoutSessionCreateOperation: GraphQLOperationMetadata<typeof CommerceCheckoutSessionCreateDocument> = {
  operation: 'CommerceCheckoutSessionCreate',
  operationType: 'mutation',
  document: CommerceCheckoutSessionCreateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.CommerceCheckoutSessionCreateInput,
    },
  ],
}
  
export const ContactsOperation: GraphQLOperationMetadata<typeof ContactsDocument> = {
  operation: 'Contacts',
  operationType: 'query',
  document: ContactsDocument,
  parameters: [
    {
      parameter: 'pagination',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInputWithFilters,
    },
  ],
}
  
export const ContactOperation: GraphQLOperationMetadata<typeof ContactDocument> = {
  operation: 'Contact',
  operationType: 'query',
  document: ContactDocument,
  parameters: [
    {
      parameter: 'id',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const ContactCreateOperation: GraphQLOperationMetadata<typeof ContactCreateDocument> = {
  operation: 'ContactCreate',
  operationType: 'mutation',
  document: ContactCreateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.ContactCreateInput,
    },
  ],
}
  
export const ContactUpdateOperation: GraphQLOperationMetadata<typeof ContactUpdateDocument> = {
  operation: 'ContactUpdate',
  operationType: 'mutation',
  document: ContactUpdateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.ContactUpdateInput,
    },
  ],
}
  
export const ContactFieldUpdateOperation: GraphQLOperationMetadata<typeof ContactFieldUpdateDocument> = {
  operation: 'ContactFieldUpdate',
  operationType: 'mutation',
  document: ContactFieldUpdateDocument,
  parameters: [
    {
      parameter: 'contactId',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.ContactFieldUpdateInput,
    },
  ],
}
  
export const ContactDeleteOperation: GraphQLOperationMetadata<typeof ContactDeleteDocument> = {
  operation: 'ContactDelete',
  operationType: 'mutation',
  document: ContactDeleteDocument,
  parameters: [
    {
      parameter: 'id',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const DataInteractionDatabasesOperation: GraphQLOperationMetadata<typeof DataInteractionDatabasesDocument> = {
  operation: 'DataInteractionDatabases',
  operationType: 'query',
  document: DataInteractionDatabasesDocument,
  parameters: [
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInput,
    },
  ],
}
  
export const DataInteractionDatabaseTableOperation: GraphQLOperationMetadata<typeof DataInteractionDatabaseTableDocument> = {
  operation: 'DataInteractionDatabaseTable',
  operationType: 'query',
  document: DataInteractionDatabaseTableDocument,
  parameters: [
    {
      parameter: 'databaseName',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'tableName',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const DataInteractionDatabaseTableMetricsOperation: GraphQLOperationMetadata<typeof DataInteractionDatabaseTableMetricsDocument> = {
  operation: 'DataInteractionDatabaseTableMetrics',
  operationType: 'query',
  document: DataInteractionDatabaseTableMetricsDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.DataInteractionDatabaseTableMetricsQueryInput,
    },
  ],
}
  
export const DataInteractionDatabaseTablesOperation: GraphQLOperationMetadata<typeof DataInteractionDatabaseTablesDocument> = {
  operation: 'DataInteractionDatabaseTables',
  operationType: 'query',
  document: DataInteractionDatabaseTablesDocument,
  parameters: [
    {
      parameter: 'databaseName',
      required: false,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInput,
    },
  ],
}
  
export const DataInteractionDatabaseTableRowsOperation: GraphQLOperationMetadata<typeof DataInteractionDatabaseTableRowsDocument> = {
  operation: 'DataInteractionDatabaseTableRows',
  operationType: 'query',
  document: DataInteractionDatabaseTableRowsDocument,
  parameters: [
    {
      parameter: 'databaseName',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'tableName',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInput,
    },
    {
      parameter: 'orderBy',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.OrderBy,
    },
    {
      parameter: 'filters',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.ColumnFilterGroup,
    },
  ],
}
  
export const EmailCampaignsOperation: GraphQLOperationMetadata<typeof EmailCampaignsDocument> = {
  operation: 'EmailCampaigns',
  operationType: 'query',
  document: EmailCampaignsDocument,
  parameters: [
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInputWithFilters,
    },
  ],
}
  
export const EmailListsOperation: GraphQLOperationMetadata<typeof EmailListsDocument> = {
  operation: 'EmailLists',
  operationType: 'query',
  document: EmailListsDocument,
  parameters: [
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInput,
    },
  ],
}
  
export const EngagementEventCreateOperation: GraphQLOperationMetadata<typeof EngagementEventCreateDocument> = {
  operation: 'EngagementEventCreate',
  operationType: 'mutation',
  document: EngagementEventCreateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.CreateEngagementEventInput,
    },
  ],
}
  
export const EngagementEventsCreateOperation: GraphQLOperationMetadata<typeof EngagementEventsCreateDocument> = {
  operation: 'EngagementEventsCreate',
  operationType: 'mutation',
  document: EngagementEventsCreateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'list',
      itemKind: 'object',
      type: GraphQLInputTypes.CreateEngagementEventInput,
      allowsEmpty: false,
    },
  ],
}
  
export const PostsOperation: GraphQLOperationMetadata<typeof PostsDocument> = {
  operation: 'Posts',
  operationType: 'query',
  document: PostsDocument,
  parameters: [
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInputWithFilters,
    },
    {
      parameter: 'orderBy',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.OrderBy,
    },
  ],
}
  
export const PostsMineOperation: GraphQLOperationMetadata<typeof PostsMineDocument> = {
  operation: 'PostsMine',
  operationType: 'query',
  document: PostsMineDocument,
  parameters: [
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInputWithFilters,
    },
  ],
}
  
export const PostOperation: GraphQLOperationMetadata<typeof PostDocument> = {
  operation: 'Post',
  operationType: 'query',
  document: PostDocument,
  parameters: [
    {
      parameter: 'identifier',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const PostCreateOperation: GraphQLOperationMetadata<typeof PostCreateDocument> = {
  operation: 'PostCreate',
  operationType: 'mutation',
  document: PostCreateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.PostCreateInput,
    },
  ],
}
  
export const PostUpdateOperation: GraphQLOperationMetadata<typeof PostUpdateDocument> = {
  operation: 'PostUpdate',
  operationType: 'mutation',
  document: PostUpdateDocument,
  parameters: [
    {
      parameter: 'id',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.PostUpdateInput,
    },
  ],
}
  
export const PostDeleteOperation: GraphQLOperationMetadata<typeof PostDeleteDocument> = {
  operation: 'PostDelete',
  operationType: 'mutation',
  document: PostDeleteDocument,
  parameters: [
    {
      parameter: 'id',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const PostVoteOperation: GraphQLOperationMetadata<typeof PostVoteDocument> = {
  operation: 'PostVote',
  operationType: 'mutation',
  document: PostVoteDocument,
  parameters: [
    {
      parameter: 'postId',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'type',
      required: true,
      kind: 'enum',
      type: GraphQLInputTypes.PostVoteType,
    },
  ],
}
  
export const PostUnvoteOperation: GraphQLOperationMetadata<typeof PostUnvoteDocument> = {
  operation: 'PostUnvote',
  operationType: 'mutation',
  document: PostUnvoteDocument,
  parameters: [
    {
      parameter: 'postId',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const PostReactionCreateOperation: GraphQLOperationMetadata<typeof PostReactionCreateDocument> = {
  operation: 'PostReactionCreate',
  operationType: 'mutation',
  document: PostReactionCreateDocument,
  parameters: [
    {
      parameter: 'postId',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'content',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const PostReactionDeleteOperation: GraphQLOperationMetadata<typeof PostReactionDeleteDocument> = {
  operation: 'PostReactionDelete',
  operationType: 'mutation',
  document: PostReactionDeleteDocument,
  parameters: [
    {
      parameter: 'postId',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'content',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const PostReactionProfilesOperation: GraphQLOperationMetadata<typeof PostReactionProfilesDocument> = {
  operation: 'PostReactionProfiles',
  operationType: 'query',
  document: PostReactionProfilesDocument,
  parameters: [
    {
      parameter: 'postId',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'content',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInput,
    },
  ],
}
  
export const PostReportCreateOperation: GraphQLOperationMetadata<typeof PostReportCreateDocument> = {
  operation: 'PostReportCreate',
  operationType: 'mutation',
  document: PostReportCreateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.PostReportInput,
    },
  ],
}
  
export const PostTopicByIdOperation: GraphQLOperationMetadata<typeof PostTopicByIdDocument> = {
  operation: 'PostTopicById',
  operationType: 'query',
  document: PostTopicByIdDocument,
  parameters: [
    {
      parameter: 'id',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const PostTopicsOperation: GraphQLOperationMetadata<typeof PostTopicsDocument> = {
  operation: 'PostTopics',
  operationType: 'query',
  document: PostTopicsDocument,
  parameters: [
    {
      parameter: 'ids',
      required: false,
      kind: 'list',
      itemKind: 'scalar',
      type: 'String',
      allowsEmpty: false,
    },
  ],
}
  
export const PostTopicCreateOperation: GraphQLOperationMetadata<typeof PostTopicCreateDocument> = {
  operation: 'PostTopicCreate',
  operationType: 'mutation',
  document: PostTopicCreateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.PostTopicCreateInput,
    },
  ],
}
  
export const PostTopicUpdateOperation: GraphQLOperationMetadata<typeof PostTopicUpdateDocument> = {
  operation: 'PostTopicUpdate',
  operationType: 'mutation',
  document: PostTopicUpdateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.PostTopicUpdateInput,
    },
  ],
}
  
export const PostTopicDeleteOperation: GraphQLOperationMetadata<typeof PostTopicDeleteDocument> = {
  operation: 'PostTopicDelete',
  operationType: 'mutation',
  document: PostTopicDeleteDocument,
  parameters: [
    {
      parameter: 'id',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const SupportPostOperation: GraphQLOperationMetadata<typeof SupportPostDocument> = {
  operation: 'SupportPost',
  operationType: 'query',
  document: SupportPostDocument,
  parameters: [
    {
      parameter: 'identifier',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const SupportPostsOperation: GraphQLOperationMetadata<typeof SupportPostsDocument> = {
  operation: 'SupportPosts',
  operationType: 'query',
  document: SupportPostsDocument,
  parameters: [
    {
      parameter: 'paginationInputWithFilters',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInputWithFilters,
    },
  ],
}
  
export const SupportPostTopicOperation: GraphQLOperationMetadata<typeof SupportPostTopicDocument> = {
  operation: 'SupportPostTopic',
  operationType: 'query',
  document: SupportPostTopicDocument,
  parameters: [
    {
      parameter: 'slug',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'path',
      required: false,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInput,
    },
  ],
}
  
export const SupportTicketCreateOperation: GraphQLOperationMetadata<typeof SupportTicketCreateDocument> = {
  operation: 'SupportTicketCreate',
  operationType: 'mutation',
  document: SupportTicketCreateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.SupportTicketCreateInput,
    },
  ],
}
  
export const SupportTicketsAdminOperation: GraphQLOperationMetadata<typeof SupportTicketsAdminDocument> = {
  operation: 'SupportTicketsAdmin',
  operationType: 'query',
  document: SupportTicketsAdminDocument,
  parameters: [
    {
      parameter: 'pagination',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInputWithFilters,
    },
    {
      parameter: 'orderBy',
      required: false,
      kind: 'object',
      type: GraphQLInputTypes.OrderBy,
    },
  ],
}
  
export const SupportTicketAssignOperation: GraphQLOperationMetadata<typeof SupportTicketAssignDocument> = {
  operation: 'SupportTicketAssign',
  operationType: 'mutation',
  document: SupportTicketAssignDocument,
  parameters: [
    {
      parameter: 'ticketId',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'username',
      required: false,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const SupportTicketCommentCreateAdminOperation: GraphQLOperationMetadata<typeof SupportTicketCommentCreateAdminDocument> = {
  operation: 'SupportTicketCommentCreateAdmin',
  operationType: 'mutation',
  document: SupportTicketCommentCreateAdminDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.SupportTicketCommentCreateInput,
    },
  ],
}
  
export const WaitListCreateOperation: GraphQLOperationMetadata<typeof WaitListCreateDocument> = {
  operation: 'WaitListCreate',
  operationType: 'mutation',
  document: WaitListCreateDocument,
  parameters: [
    {
      parameter: 'data',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.WaitListCreationInput,
    },
  ],
}
  
export const WaitListEntriesOperation: GraphQLOperationMetadata<typeof WaitListEntriesDocument> = {
  operation: 'WaitListEntries',
  operationType: 'query',
  document: WaitListEntriesDocument,
  parameters: [
    {
      parameter: 'waitListIdentifier',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
    {
      parameter: 'itemsPerPage',
      required: true,
      kind: 'scalar',
      type: 'Int',
    },
  ],
}
  
export const WaitListEntryCreateOperation: GraphQLOperationMetadata<typeof WaitListEntryCreateDocument> = {
  operation: 'WaitListEntryCreate',
  operationType: 'mutation',
  document: WaitListEntryCreateDocument,
  parameters: [
    {
      parameter: 'emailAddress',
      required: true,
      kind: 'scalar',
      type: 'String',
    },
  ],
}
  
export const TaskCreatePortScanOperation: GraphQLOperationMetadata<typeof TaskCreatePortScanDocument> = {
  operation: 'TaskCreatePortScan',
  operationType: 'mutation',
  document: TaskCreatePortScanDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.TaskPortScanInput,
    },
  ],
}
  
export const TaskPortScanOperation: GraphQLOperationMetadata<typeof TaskPortScanDocument> = {
  operation: 'TaskPortScan',
  operationType: 'query',
  document: TaskPortScanDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.TaskInput,
    },
  ],
}
  