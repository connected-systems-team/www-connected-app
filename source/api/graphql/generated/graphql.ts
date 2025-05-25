/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
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
  assignments: AccessRoleAssignment;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type AccessRoleAssignment = {
  __typename?: 'AccessRoleAssignment';
  accessRole: AccessRole;
  accessRoleId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  emailAddress?: Maybe<Scalars['String']['output']>;
  expiresAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['String']['output'];
  profile: Profile;
  status: AccessRoleStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type AccessRoleAssignmentCreateInput = {
  accessRole: Scalars['String']['input'];
  emailAddress: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  username: Scalars['String']['input'];
};

export type AccessRoleAssignmentRevokeInput = {
  accessRole: Scalars['String']['input'];
  emailAddress: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type AccessRoleCreateInput = {
  description: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type AccessRoleInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};

export type AccessRoleListInput = {
  type?: InputMaybe<Scalars['String']['input']>;
};

/** The status of an access role for an account/profile */
export enum AccessRoleStatus {
  Active = 'Active',
  Expired = 'Expired',
  Revoked = 'Revoked'
}

export type AccessRoleUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Account = {
  __typename?: 'Account';
  accessRoles: Array<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  defaultProfile: Profile;
  defaultProfileId: Scalars['String']['output'];
  emailAddress: Scalars['String']['output'];
  emails: Array<AccountEmail>;
  enrolledChallenges: Array<Scalars['String']['output']>;
  profile: Profile;
  profiles: Array<Profile>;
  session?: Maybe<AccountSession>;
  status: AccountStatus;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type AccountDeleteInput = {
  emailAddress: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
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

export type AccountEmailVerificationVerifyInput = {
  code: Scalars['String']['input'];
};

export type AccountEncryptionConfiguration = {
  publicKey: Scalars['String']['input'];
  transitKeyId: Scalars['String']['input'];
};

export type AccountInput = {
  emailAddress: Scalars['String']['input'];
};

export type AccountPasswordUpdateInput = {
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
  accessRoles: AccessRoleAssignment;
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  lastUsed?: Maybe<Scalars['DateTimeISO']['output']>;
  profile: Profile;
  profileId: Scalars['String']['output'];
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

/** The status of an account */
export enum AccountStatus {
  Active = 'Active',
  Archived = 'Archived',
  Locked = 'Locked'
}

export type AppleStoreTransactionOrderMapping = {
  __typename?: 'AppleStoreTransactionOrderMapping';
  commerceOrder: CommerceOrder;
  commerceOrderId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  transactionId: Scalars['String']['output'];
};

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

export type CheckoutSessionCreateDirectItemInput = {
  productVariantId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type ClientPropertiesInput = {
  environment?: InputMaybe<Scalars['String']['input']>;
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

export type ColumnFilterGroupInput = {
  conditions?: InputMaybe<Array<ColumnFilterInput>>;
  filters?: InputMaybe<Array<ColumnFilterGroupInput>>;
  operator?: InputMaybe<ColumnFilterGroupOperator>;
};

export enum ColumnFilterGroupOperator {
  And = 'And',
  Or = 'Or'
}

export type ColumnFilterInput = {
  caseSensitive?: InputMaybe<Scalars['Boolean']['input']>;
  column: Scalars['String']['input'];
  operator: ColumnFilterConditionOperator;
  value: Scalars['JSON']['input'];
};

export type CommerceCheckoutSession = {
  __typename?: 'CommerceCheckoutSession';
  appliedDiscounts?: Maybe<Array<CommerceOrderDiscount>>;
  closedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  completedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  externalMetadata?: Maybe<Scalars['JSON']['output']>;
  failedCount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  order?: Maybe<CommerceOrder>;
  orderMetadata?: Maybe<Scalars['JSON']['output']>;
  paymentProcessorType: PaymentProcessorType;
  priceInfo?: Maybe<CommerceOrderPrice>;
  status: CommerceCheckoutSessionStatus;
};

export type CommerceCheckoutSessionCreateDirectInput = {
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  items: Array<CheckoutSessionCreateDirectItemInput>;
  orderMetadata?: InputMaybe<Scalars['JSON']['input']>;
  paymentProcessorType?: PaymentProcessorType;
  returnBaseUrl: Scalars['String']['input'];
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
  appliedDiscounts?: Maybe<Array<CommerceOrderDiscount>>;
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
  refunds?: Maybe<Array<Refund>>;
  shipments?: Maybe<Array<Shipment>>;
  shippingInfo?: Maybe<CommerceOrderShippingInfo>;
  source: Scalars['String']['output'];
  status: CommerceOrderStatus;
  statusDescription?: Maybe<Scalars['String']['output']>;
  statusRecords?: Maybe<Array<StatusRecord>>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type CommerceOrderDiscount = {
  __typename?: 'CommerceOrderDiscount';
  amount: Scalars['MonetaryDecimal']['output'];
  code?: Maybe<Scalars['String']['output']>;
  colorOption?: Maybe<LabelColorOption>;
  items?: Maybe<Array<CommerceOrderLineItemDiscount>>;
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
  originalQuantity?: Maybe<Scalars['Int']['output']>;
  productVariantId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  shippedQuantity: Scalars['Int']['output'];
  status: CommerceOrderLineItemStatus;
  statusDescription?: Maybe<Scalars['String']['output']>;
  statusRecords?: Maybe<Array<StatusRecord>>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type CommerceOrderLineItemDiscount = {
  __typename?: 'CommerceOrderLineItemDiscount';
  amount: Scalars['MonetaryDecimal']['output'];
  indexId: Scalars['Int']['output'];
  unitAmount?: Maybe<Scalars['MonetaryDecimal']['output']>;
};

export type CommerceOrderLineItemPrice = {
  __typename?: 'CommerceOrderLineItemPrice';
  amount: Scalars['MonetaryDecimal']['output'];
  indexId: Scalars['Int']['output'];
  originalSubtotal: Scalars['MonetaryDecimal']['output'];
  originalUnitPrice?: Maybe<Scalars['MonetaryDecimal']['output']>;
  subtotal: Scalars['MonetaryDecimal']['output'];
  tax: Scalars['MonetaryDecimal']['output'];
  unitPrice?: Maybe<Scalars['MonetaryDecimal']['output']>;
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
  Refunded = 'Refunded',
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
  metadata?: Maybe<Scalars['JSON']['output']>;
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
  category?: InputMaybe<Scalars['String']['input']>;
  clientProperties?: InputMaybe<ClientPropertiesInput>;
  deviceProperties?: InputMaybe<DevicePropertiesInput>;
  eventContext?: InputMaybe<EngagementEventContextInput>;
  name: Scalars['String']['input'];
};

export type CreateFulfillmentInput = {
  baseUrl: Scalars['String']['input'];
  items: Array<CreateFulfillmentItemInput>;
  orderIdentifier: Scalars['String']['input'];
  originAddress: StreetAddressInput;
  trackingInfo: CreateFulfillmentTrackingInfoInput;
};

export type CreateFulfillmentItemInput = {
  id: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
};

export type CreateFulfillmentTrackingInfoInput = {
  company: Scalars['String']['input'];
  number: Scalars['String']['input'];
  serviceType: ShippingServiceType;
  url: Scalars['String']['input'];
};

export type CreateOrderRefundInput = {
  lineItems: Array<CreateOrderRefundLineItemInput>;
  orderId: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrderRefundLineItemInput = {
  orderLineItemId: Scalars['Float']['input'];
  quantity: Scalars['Float']['input'];
};

export type CreateProductBundleInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
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
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  status?: InputMaybe<ProductStatus>;
  variants: Array<CreateProductVariantInput>;
  vendorId: Scalars['String']['input'];
};

export type CreateProductVariantInput = {
  attributes?: InputMaybe<Array<ProductVariantAttributeInput>>;
  barcode?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  gtin?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  inventoryPolicy?: InputMaybe<ProductVariantInventoryPolicy>;
  isVirtual?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  position?: InputMaybe<Scalars['Float']['input']>;
  price: ProductVariantPriceInput;
  productId?: InputMaybe<Scalars['String']['input']>;
  setDefault?: InputMaybe<Scalars['Boolean']['input']>;
  sku?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<ProductVariantStatus>;
  taxCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateVendorInput = {
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
  pagination: Pagination;
  relations?: Maybe<Array<DatabaseTableRelation>>;
  rowCount: Scalars['Int']['output'];
  tableName: Scalars['String']['output'];
};

export type DatabaseTableMetadataWithRows = {
  __typename?: 'DatabaseTableMetadataWithRows';
  columns?: Maybe<Array<DatabaseTableColumn>>;
  databaseName: Scalars['String']['output'];
  items: Array<Scalars['JSON']['output']>;
  pagination: Pagination;
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
  pagination: Pagination;
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

export type DevicePropertiesInput = {
  orientation?: InputMaybe<DeviceOrientation>;
};

export type DiscordWebhookMessageCreateEmbedInput = {
  authorName?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  timestamp?: InputMaybe<Scalars['DateTimeISO']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  url?: InputMaybe<Scalars['String']['input']>;
};

export type DiscordWebhookMessageCreateInput = {
  content?: InputMaybe<Scalars['String']['input']>;
  embeds?: InputMaybe<Array<DiscordWebhookMessageCreateEmbedInput>>;
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

/** The type of the discount. */
export enum DiscountType {
  Automatic = 'Automatic',
  Code = 'Code'
}

export enum DiscountValueType {
  FixedAmount = 'FixedAmount',
  Percentage = 'Percentage'
}

/** DNS Record Types */
export enum DnsRecordType {
  A = 'A',
  Aaaa = 'AAAA',
  Cname = 'CNAME',
  Mx = 'MX',
  Ns = 'NS',
  Ptr = 'PTR',
  Soa = 'SOA',
  Srv = 'SRV',
  Txt = 'TXT'
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

/** Enabled filter type */
export enum EnabledFilterType {
  All = 'All',
  Disabled = 'Disabled',
  Enabled = 'Enabled'
}

export type EngagementEvent = {
  __typename?: 'EngagementEvent';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  loggedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  name: Scalars['String']['output'];
};

export type EngagementEventContextInput = {
  loadDurationInMilliseconds?: InputMaybe<Scalars['Int']['input']>;
  loggedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  previousViewDurationInMilliseconds?: InputMaybe<Scalars['Int']['input']>;
  previousViewIdentifier?: InputMaybe<Scalars['String']['input']>;
  previousViewTitle?: InputMaybe<Scalars['String']['input']>;
  referrer?: InputMaybe<Scalars['String']['input']>;
  sessionDurationInMilliseconds?: InputMaybe<Scalars['Int']['input']>;
  traceId?: InputMaybe<Scalars['String']['input']>;
  traceSequenceNumber?: InputMaybe<Scalars['Int']['input']>;
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

export type Entitlement = {
  __typename?: 'Entitlement';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description: Scalars['String']['output'];
  featureKey: Scalars['String']['output'];
  id: Scalars['String']['output'];
  profiles: Array<ProfileEntitlement>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type EntitlementCreateInput = {
  description: Scalars['String']['input'];
  featureKey: Scalars['String']['input'];
};

export type EntitlementInput = {
  featureKey?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type EntitlementListInput = {
  featureKey?: InputMaybe<Scalars['String']['input']>;
};

export type EntitlementUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  featureKey?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
};

export type FlowEntity = {
  __typename?: 'FlowEntity';
  activeVersion?: Maybe<FlowVersionEntity>;
  activeVersionId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  executions: Array<FlowExecution>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
  versions: Array<FlowVersionEntity>;
};

export type FlowExecution = {
  __typename?: 'FlowExecution';
  completedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  elapsedTimeMs?: Maybe<Scalars['Float']['output']>;
  entryPointId: Scalars['String']['output'];
  errors?: Maybe<Array<Scalars['JSON']['output']>>;
  flowEntity?: Maybe<FlowEntity>;
  flowType: FlowType;
  flowTypeId: Scalars['String']['output'];
  flowVersionEntity?: Maybe<FlowVersionEntity>;
  flowVersionId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  input?: Maybe<Scalars['JSON']['output']>;
  logs?: Maybe<Array<Scalars['JSON']['output']>>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  output?: Maybe<Scalars['JSON']['output']>;
  startedAt: Scalars['DateTimeISO']['output'];
  status: FlowExecutionStatus;
  stepExecutions: Array<FlowStepExecution>;
  triggerId?: Maybe<Scalars['String']['output']>;
  triggerType: FlowTriggerType;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type FlowExecutionHistoryInput = {
  flowId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<FlowExecutionStatus>>;
  triggerId?: InputMaybe<Scalars['String']['input']>;
};

export type FlowExecutionInput = {
  executionId: Scalars['String']['input'];
};

export enum FlowExecutionStatus {
  Canceled = 'Canceled',
  Failed = 'Failed',
  NotStarted = 'NotStarted',
  Running = 'Running',
  Success = 'Success'
}

export type FlowStepExecution = {
  __typename?: 'FlowStepExecution';
  actionType: Scalars['String']['output'];
  attempt: Scalars['Float']['output'];
  completedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  elapsedTimeMs?: Maybe<Scalars['Float']['output']>;
  errors?: Maybe<Scalars['JSON']['output']>;
  flowExecution: FlowExecution;
  flowExecutionId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  input?: Maybe<Scalars['JSON']['output']>;
  logs?: Maybe<Array<Scalars['JSON']['output']>>;
  output?: Maybe<Scalars['JSON']['output']>;
  startedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  status: FlowStepExecutionStatus;
  stepId: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export enum FlowStepExecutionStatus {
  Failed = 'Failed',
  NotStarted = 'NotStarted',
  Running = 'Running',
  Success = 'Success'
}

export type FlowSubscribeInput = {
  triggerId: Scalars['String']['input'];
};

export enum FlowTriggerType {
  Manual = 'Manual',
  Recurring = 'Recurring',
  Webhook = 'Webhook'
}

export enum FlowType {
  Custom = 'Custom',
  Entity = 'Entity',
  Static = 'Static'
}

export type FlowVersionEntity = {
  __typename?: 'FlowVersionEntity';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  executions: Array<FlowExecution>;
  flow: FlowEntity;
  flowId: Scalars['String']['output'];
  graph: Scalars['JSON']['output'];
  id: Scalars['String']['output'];
};

export type FontConfig = {
  __typename?: 'FontConfig';
  fontFamily: Scalars['String']['output'];
  fontSize: Scalars['Int']['output'];
};

export type FontConfigInput = {
  fontFamily: Scalars['String']['input'];
  fontSize: Scalars['Int']['input'];
};

export type Form = {
  __typename?: 'Form';
  archivedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  components?: Maybe<Array<FormComponent>>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  identifier: Scalars['String']['output'];
  metadata?: Maybe<FormMetadata>;
  originalFormId?: Maybe<Scalars['String']['output']>;
  publishedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  status: FormStatus;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type FormComponent = FormComponentDataCheckbox | FormComponentDataCheckboxGrid | FormComponentDataDate | FormComponentDataDropdown | FormComponentDataLinearScale | FormComponentDataMultipleChoice | FormComponentDataMultipleChoiceGrid | FormComponentDataParagraph | FormComponentDataRating | FormComponentDataSectionHeader | FormComponentDataShortAnswer | FormComponentDataTime | FormComponentDataTitleAndDescription;

export type FormComponentCreateInput = {
  data?: InputMaybe<Scalars['JSON']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  required: Scalars['Boolean']['input'];
  section: Scalars['Int']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  type: FormComponentType;
};

export type FormComponentDataCheckbox = {
  __typename?: 'FormComponentDataCheckbox';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  maxSelections?: Maybe<Scalars['Int']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  options: Array<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataCheckboxGrid = {
  __typename?: 'FormComponentDataCheckboxGrid';
  allowEmpty?: Maybe<Scalars['Boolean']['output']>;
  columns: Array<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  maxSelectionsPerRow?: Maybe<Scalars['Int']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  rows: Array<Scalars['String']['output']>;
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataDate = {
  __typename?: 'FormComponentDataDate';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  initialDate?: Maybe<Scalars['DateTimeISO']['output']>;
  maxDate?: Maybe<Scalars['DateTimeISO']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  minDate?: Maybe<Scalars['DateTimeISO']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataDropdown = {
  __typename?: 'FormComponentDataDropdown';
  defaultOption?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  options: Array<Scalars['String']['output']>;
  placeholder?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataLinearScale = {
  __typename?: 'FormComponentDataLinearScale';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  leftLabel?: Maybe<Scalars['String']['output']>;
  max: Scalars['Int']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  min: Scalars['Int']['output'];
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  rightLabel?: Maybe<Scalars['String']['output']>;
  section: Scalars['Int']['output'];
  step: Scalars['Decimal']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataMultipleChoice = {
  __typename?: 'FormComponentDataMultipleChoice';
  defaultOption?: Maybe<Scalars['Int']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  options: Array<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataMultipleChoiceGrid = {
  __typename?: 'FormComponentDataMultipleChoiceGrid';
  columns: Array<Scalars['String']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  rows: Array<Scalars['String']['output']>;
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataParagraph = {
  __typename?: 'FormComponentDataParagraph';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  placeholder?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataRating = {
  __typename?: 'FormComponentDataRating';
  allowHalf?: Maybe<Scalars['Boolean']['output']>;
  allowZero?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  icon: Scalars['String']['output'];
  id: Scalars['String']['output'];
  max: Scalars['Int']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataSectionHeader = {
  __typename?: 'FormComponentDataSectionHeader';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataShortAnswer = {
  __typename?: 'FormComponentDataShortAnswer';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  placeholder?: Maybe<Scalars['String']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataTime = {
  __typename?: 'FormComponentDataTime';
  allowSeconds?: Maybe<Scalars['Boolean']['output']>;
  ampm?: Maybe<Scalars['Boolean']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  initialTime?: Maybe<Scalars['DateTimeISO']['output']>;
  maxTime?: Maybe<Scalars['DateTimeISO']['output']>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  minTime?: Maybe<Scalars['DateTimeISO']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

export type FormComponentDataTitleAndDescription = {
  __typename?: 'FormComponentDataTitleAndDescription';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  metadata?: Maybe<Scalars['JSON']['output']>;
  position: Scalars['Int']['output'];
  required: Scalars['Boolean']['output'];
  section: Scalars['Int']['output'];
  title?: Maybe<Scalars['String']['output']>;
  type: FormComponentType;
};

/** The type of component in a form */
export enum FormComponentType {
  Checkbox = 'Checkbox',
  CheckboxGrid = 'CheckboxGrid',
  Date = 'Date',
  Dropdown = 'Dropdown',
  LinearScale = 'LinearScale',
  MultipleChoice = 'MultipleChoice',
  MultipleChoiceGrid = 'MultipleChoiceGrid',
  Paragraph = 'Paragraph',
  Rating = 'Rating',
  SectionHeader = 'SectionHeader',
  ShortAnswer = 'ShortAnswer',
  Time = 'Time',
  TitleAndDescription = 'TitleAndDescription'
}

export type FormCreateInput = {
  components?: InputMaybe<Array<FormComponentCreateInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<FormMetadataInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FormMetadata = {
  __typename?: 'FormMetadata';
  theme?: Maybe<FormThemeMetadata>;
};

export type FormMetadataInput = {
  theme?: InputMaybe<FormThemeMetadataInput>;
};

export enum FormStatus {
  Archived = 'Archived',
  Draft = 'Draft',
  Published = 'Published'
}

export type FormThemeMetadata = {
  __typename?: 'FormThemeMetadata';
  backgroundColor?: Maybe<Scalars['String']['output']>;
  header?: Maybe<FontConfig>;
  primaryColor?: Maybe<Scalars['String']['output']>;
  question?: Maybe<FontConfig>;
  text?: Maybe<FontConfig>;
};

export type FormThemeMetadataInput = {
  backgroundColor?: InputMaybe<Scalars['String']['input']>;
  header?: InputMaybe<FontConfigInput>;
  primaryColor?: InputMaybe<Scalars['String']['input']>;
  question?: InputMaybe<FontConfigInput>;
  text?: InputMaybe<FontConfigInput>;
};

export type FormUpdateInput = {
  components?: InputMaybe<Array<FormComponentCreateInput>>;
  description?: InputMaybe<Scalars['String']['input']>;
  metadata?: InputMaybe<FormMetadataInput>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type FormUserData = {
  __typename?: 'FormUserData';
  accountId?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  data: Scalars['JSON']['output'];
  emailAddress?: Maybe<Scalars['String']['output']>;
  formId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  profileId?: Maybe<Scalars['String']['output']>;
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
  orderLineItemId: Scalars['String']['output'];
  productVariant: FulfillmentProductVariant;
  productVariantId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
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

export type GridCapability = {
  __typename?: 'GridCapability';
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridCapabilityCreateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type GridCapabilityInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GridCapabilityUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GridCloudProvider = {
  __typename?: 'GridCloudProvider';
  adapter: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridCloudProviderCreateInput = {
  adapter: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type GridCloudProviderInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GridCloudProviderListInput = {
  adapter?: InputMaybe<Scalars['String']['input']>;
  enabledOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GridCloudProviderUpdateInput = {
  adapter?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type GridNode = {
  __typename?: 'GridNode';
  createdAt: Scalars['DateTimeISO']['output'];
  enabled: Scalars['Boolean']['output'];
  healthEndpoint: Scalars['String']['output'];
  host: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastSeenAt?: Maybe<Scalars['DateTimeISO']['output']>;
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  online: Scalars['Boolean']['output'];
  providerRegionId: Scalars['String']['output'];
  settings?: Maybe<Scalars['JSON']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridNodeCapability = {
  __typename?: 'GridNodeCapability';
  capabilityId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  nodeId: Scalars['String']['output'];
};

export type GridNodeCapabilityAssignInput = {
  capabilityId: Scalars['String']['input'];
  nodeId: Scalars['String']['input'];
};

export type GridNodeCapabilityListInput = {
  capabilityId?: InputMaybe<Scalars['String']['input']>;
  nodeId?: InputMaybe<Scalars['String']['input']>;
};

export type GridNodeCapabilityRemoveInput = {
  capabilityId: Scalars['String']['input'];
  nodeId: Scalars['String']['input'];
};

export type GridNodeCreateInput = {
  host: Scalars['String']['input'];
  name: Scalars['String']['input'];
  port?: InputMaybe<Scalars['Float']['input']>;
  providerRegionId: Scalars['String']['input'];
};

export type GridNodeInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GridNodeListInput = {
  providerRegionId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
};

export type GridNodeUpdateInput = {
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GridProviderRegion = {
  __typename?: 'GridProviderRegion';
  cloudProviderId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  healthEndpoint?: Maybe<Scalars['String']['output']>;
  host?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  key?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  online: Scalars['Boolean']['output'];
  providerRegionCode: Scalars['String']['output'];
  regionId: Scalars['String']['output'];
  secure: Scalars['Boolean']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridProviderRegionCapability = {
  __typename?: 'GridProviderRegionCapability';
  capabilityId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  providerRegionId: Scalars['String']['output'];
};

export type GridProviderRegionCapabilityAssignInput = {
  capabilityId: Scalars['String']['input'];
  providerRegionId: Scalars['String']['input'];
};

export type GridProviderRegionCapabilityListInput = {
  capabilityId?: InputMaybe<Scalars['String']['input']>;
  providerRegionId?: InputMaybe<Scalars['String']['input']>;
};

export type GridProviderRegionCapabilityRemoveInput = {
  capabilityId: Scalars['String']['input'];
  providerRegionId: Scalars['String']['input'];
};

export type GridProviderRegionCreateInput = {
  cloudProviderId: Scalars['String']['input'];
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  healthEndpoint?: InputMaybe<Scalars['String']['input']>;
  host?: InputMaybe<Scalars['String']['input']>;
  key?: InputMaybe<Scalars['String']['input']>;
  online?: InputMaybe<Scalars['Boolean']['input']>;
  providerRegionCode: Scalars['String']['input'];
  regionId: Scalars['String']['input'];
  secure?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GridProviderRegionInput = {
  cloudProviderId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  providerRegionCode?: InputMaybe<Scalars['String']['input']>;
  regionId?: InputMaybe<Scalars['String']['input']>;
};

export type GridProviderRegionListInput = {
  cloudProviderId?: InputMaybe<Scalars['String']['input']>;
  enabledOnly?: InputMaybe<Scalars['Boolean']['input']>;
  regionId?: InputMaybe<Scalars['String']['input']>;
};

export type GridProviderRegionUpdateInput = {
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  providerRegionCode?: InputMaybe<Scalars['String']['input']>;
};

export type GridRegion = {
  __typename?: 'GridRegion';
  country: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  division: Scalars['String']['output'];
  enabled: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  locality: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  region: Scalars['String']['output'];
  site?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridRegionCreateInput = {
  country: Scalars['String']['input'];
  division: Scalars['String']['input'];
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  locality: Scalars['String']['input'];
  region: Scalars['String']['input'];
  site?: InputMaybe<Scalars['String']['input']>;
};

export type GridRegionInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Grid region level */
export enum GridRegionLevel {
  Country = 'Country',
  Division = 'Division',
  Locality = 'Locality',
  Region = 'Region',
  Site = 'Site'
}

export type GridRegionLevels = {
  __typename?: 'GridRegionLevels';
  country?: Maybe<Scalars['String']['output']>;
  division?: Maybe<Scalars['String']['output']>;
  locality?: Maybe<Scalars['String']['output']>;
  region?: Maybe<Scalars['String']['output']>;
  site?: Maybe<Scalars['String']['output']>;
};

export type GridRegionLevelsInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  locality?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  site?: InputMaybe<Scalars['String']['input']>;
};

export type GridRegionLevelsListInput = {
  level: GridRegionLevel;
};

export type GridRegionListInput = {
  enabled?: InputMaybe<EnabledFilterType>;
};

export type GridRegionUpdateInput = {
  country?: InputMaybe<Scalars['String']['input']>;
  division?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  locality?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  region?: InputMaybe<Scalars['String']['input']>;
  site?: InputMaybe<Scalars['String']['input']>;
};

export type GridTask = {
  __typename?: 'GridTask';
  allowAsync: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  note?: Maybe<Scalars['String']['output']>;
  timeoutMs: Scalars['Float']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridTaskCapability = {
  __typename?: 'GridTaskCapability';
  capabilityId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  taskId: Scalars['String']['output'];
};

export type GridTaskCapabilityCreateInput = {
  capabilityId: Scalars['String']['input'];
  required?: InputMaybe<Scalars['Boolean']['input']>;
  taskId: Scalars['String']['input'];
};

export type GridTaskCapabilityDeleteInput = {
  capabilityId: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
};

export type GridTaskCapabilityListInput = {
  capabilityId?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['String']['input']>;
};

export type GridTaskCapabilityUpdateInput = {
  capabilityId: Scalars['String']['input'];
  required: Scalars['Boolean']['input'];
  taskId: Scalars['String']['input'];
};

export type GridTaskCreateInput = {
  allowAsync?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type GridTaskExecution = {
  __typename?: 'GridTaskExecution';
  attempt: Scalars['Float']['output'];
  completedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  error?: Maybe<Scalars['JSON']['output']>;
  flowId?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  inputData?: Maybe<Scalars['JSON']['output']>;
  isAsync?: Maybe<Scalars['Boolean']['output']>;
  maxAttempts?: Maybe<Scalars['Float']['output']>;
  nodeId?: Maybe<Scalars['String']['output']>;
  outputData?: Maybe<Scalars['JSON']['output']>;
  providerRegionId?: Maybe<Scalars['String']['output']>;
  startedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  status: GridTaskExecutionStatus;
  taskTypeId: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type GridTaskExecutionInput = {
  flowId?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  nodeId?: InputMaybe<Scalars['String']['input']>;
  providerRegionId?: InputMaybe<Scalars['String']['input']>;
  taskTypeId?: InputMaybe<Scalars['String']['input']>;
};

export type GridTaskExecutionListInput = {
  flowId?: InputMaybe<Scalars['String']['input']>;
  nodeId?: InputMaybe<Scalars['String']['input']>;
  providerRegionId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<GridTaskExecutionStatus>;
  taskTypeId?: InputMaybe<Scalars['String']['input']>;
};

/** The possible states of a task ran on the Grid. */
export enum GridTaskExecutionStatus {
  Failed = 'Failed',
  Pending = 'Pending',
  Retry = 'Retry',
  Running = 'Running',
  Success = 'Success'
}

export type GridTaskInput = {
  id?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type GridTaskListInput = {
  enabledOnly?: InputMaybe<Scalars['Boolean']['input']>;
};

export type GridTaskProviderSupport = {
  __typename?: 'GridTaskProviderSupport';
  cloudProviderId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  taskId: Scalars['String']['output'];
};

export type GridTaskProviderSupportCreateInput = {
  cloudProviderId: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
};

export type GridTaskProviderSupportDeleteInput = {
  cloudProviderId: Scalars['String']['input'];
  taskId: Scalars['String']['input'];
};

export type GridTaskUpdateInput = {
  allowAsync?: InputMaybe<Scalars['Boolean']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  enabled?: InputMaybe<Scalars['Boolean']['input']>;
  id: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type ImageObject = {
  __typename?: 'ImageObject';
  type: MediaObjectType;
  url: Scalars['String']['output'];
  variant?: Maybe<Scalars['String']['output']>;
};

/** The label color to be used for display */
export enum LabelColorOption {
  Blue = 'Blue',
  Green = 'Green'
}

export enum ListEntryAction {
  Add = 'Add',
  Remove = 'Remove',
  Update = 'Update'
}

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
  /** Grant an access role to an account. */
  accountAccessRoleAssignmentCreatePrivileged: AccessRoleAssignment;
  /** Revoke an access role from an account. */
  accountAccessRoleAssignmentRevokePrivileged: OperationResult;
  /** Create a new access role. */
  accountAccessRoleCreatePrivileged: AccessRole;
  /** Delete an access role. */
  accountAccessRoleDeletePrivileged: OperationResult;
  /** Update an access role. */
  accountAccessRoleUpdatePrivileged: AccessRole;
  accountAdministratorSessionCreate: AuthenticationSession;
  accountAuthenticationEmailVerificationSend: AuthenticationEmailVerification;
  accountAuthenticationEmailVerificationVerify: AuthenticationEmailVerification;
  accountAuthenticationPasswordVerify: AuthenticationOperationResult;
  accountAuthenticationRegistrationComplete: AuthenticationOperationResult;
  accountAuthenticationRegistrationOrSignInCreate: AuthenticationRegistrationOrSignIn;
  accountAuthenticationSignInComplete: AuthenticationOperationResult;
  accountDelete: OperationResult;
  accountDeletePrivileged: OperationResult;
  accountEmailDelete: OperationResult;
  accountEmailMakePrimary: AccountEmail;
  accountEmailVerificationComplete: AccountEmail;
  accountEmailVerificationSend: EmailVerification;
  /** Create a new entitlement. */
  accountEntitlementCreatePrivileged: Entitlement;
  /** Delete an entitlement. */
  accountEntitlementDeletePrivileged: OperationResult;
  /** Update an entitlement. */
  accountEntitlementUpdatePrivileged: Entitlement;
  accountMaintenanceSessionCreate: AuthenticationSession;
  accountPasswordUpdate: OperationResult;
  /** Manually grant an entitlement to a profile. */
  accountProfileEntitlementCreatePrivileged: ProfileEntitlement;
  /** Revoke a profile entitlement. */
  accountProfileEntitlementDeletePrivileged: OperationResult;
  accountProfileImageRemove: Profile;
  accountProfileUpdate: Profile;
  accountSessionDelete: OperationResult;
  accountSignOut: OperationResult;
  commerceCheckoutSessionCreateDirect: CommerceCheckoutSession;
  commerceCreateFulfillment: Shipment;
  commerceOrderCancel: OperationResult;
  commerceOrderRefund: Refund;
  commerceProductBundleCreate: ProductBundle;
  commerceProductBundleDelete: OperationResult;
  commerceProductBundleUpdate: ProductBundle;
  commerceProductCreate: Product;
  commerceProductUpdate: Product;
  commerceRefundRequestRejectPrivileged: Refund;
  commerceVendorCreate: Vendor;
  commerceVendorUpdate: Vendor;
  contactCreate: Contact;
  contactDelete: OperationResult;
  contactFieldUpdate: Contact;
  contactUpdate: Contact;
  dataInteractionDatabaseTableRowCreate: Scalars['JSON']['output'];
  dataInteractionDatabaseTableRowDelete: OperationResult;
  dataInteractionDatabaseTableRowUpdate: Scalars['JSON']['output'];
  dataInteractionDatabaseTableRowsDelete: Scalars['Int']['output'];
  discordWebhookMessageCreate: OperationResult;
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
  engagementEventCreate: OperationResult;
  engagementEventsCreate: OperationResult;
  flowAbortPrivileged: OperationResult;
  flowCancelPrivileged: OperationResult;
  flowPurgeByDatePrivileged: OperationResult;
  flowPurgePrivileged: OperationResult;
  flowSubscribe: FlowExecution;
  flowUnsubscribe: FlowExecution;
  formArchive: Form;
  formCreate: Form;
  formFork: Form;
  formPublish: Form;
  formUpdate: Form;
  /** Create a new capability. */
  gridCapabilityCreatePrivileged: GridCapability;
  /** Delete a capability. */
  gridCapabilityDeletePrivileged: OperationResult;
  /** Update a capability. */
  gridCapabilityUpdatePrivileged: GridCapability;
  /** Create a new grid cloud provider. */
  gridCloudProviderCreatePrivileged: GridCloudProvider;
  /** Delete a grid cloud provider. */
  gridCloudProviderDeletePrivileged: OperationResult;
  /** Update a grid cloud provider. */
  gridCloudProviderUpdatePrivileged: GridCloudProvider;
  /** Assign a capability to a node. */
  gridNodeCapabilityCreatePrivileged: GridNodeCapability;
  /** Remove a capability from a node. */
  gridNodeCapabilityDeletePrivileged: OperationResult;
  /** Create a new node. */
  gridNodeCreatePrivileged: GridNode;
  /** Delete a node. */
  gridNodeDeletePrivileged: OperationResult;
  /** Update a node. */
  gridNodeUpdatePrivileged: GridNode;
  /** Assign a capability to a provider region. */
  gridProviderRegionCapabilityCreatePrivileged: GridProviderRegionCapability;
  /** Remove a capability from a provider region. */
  gridProviderRegionCapabilityDeletePrivileged: OperationResult;
  /** Create a new provider region. */
  gridProviderRegionCreatePrivileged: GridProviderRegion;
  /** Delete a provider region. */
  gridProviderRegionDeletePrivileged: OperationResult;
  /** Update a provider region. */
  gridProviderRegionUpdatePrivileged: GridProviderRegion;
  /** Create a new region. */
  gridRegionCreatePrivileged: GridRegion;
  /** Delete a region. */
  gridRegionDeletePrivileged: OperationResult;
  /** Update a region. */
  gridRegionUpdatePrivileged: GridRegion;
  /** Assign a capability to a task type. */
  gridTaskCapabilityCreatePrivileged: GridTaskCapability;
  /** Remove a capability from a task type. */
  gridTaskCapabilityDeletePrivileged: OperationResult;
  /** Update a task type capability. */
  gridTaskCapabilityUpdatePrivileged: GridTaskCapability;
  /** Create a new task type. */
  gridTaskCreatePrivileged: GridTask;
  /** Delete a task type. */
  gridTaskDeletePrivileged: OperationResult;
  /** Assign a task type to a cloud provider. */
  gridTaskProviderSupportCreatePrivileged: GridTaskProviderSupport;
  /** Remove a task type from a cloud provider. */
  gridTaskProviderSupportDeletePrivileged: OperationResult;
  /** Update a task. */
  gridTaskUpdatePrivileged: GridTask;
  networkToolDnsCreate: Scalars['String']['output'];
  networkToolPingCreate: Scalars['String']['output'];
  networkToolPortCheckCreate: Scalars['String']['output'];
  networkToolTlsCertificateCreate: Scalars['String']['output'];
  networkToolTracerouteCreate: Scalars['String']['output'];
  networkToolWhoisCreate: Scalars['String']['output'];
  postCommentCreate: PostComment;
  postCommentDelete: OperationResult;
  postCreatePrivileged: Post;
  postDelete: Scalars['String']['output'];
  postDeletePrivileged: Scalars['String']['output'];
  postDraft: Post;
  postPublish: Post;
  postPublishPrivileged: Post;
  postReactionCreate: OperationResult;
  postReactionDelete: OperationResult;
  postReportCreate: PostReport;
  postReportModerate: Post;
  postTopicAssignPost: OperationResult;
  postTopicCreate: PostTopic;
  postTopicDelete: OperationResult;
  postTopicUpdate: PostTopic;
  postTopicUpdatePosition: PostTopic;
  postUnvote: OperationResult;
  postUpdate: Post;
  postUpdatePrivileged: Post;
  postVote: OperationResult;
  productVariantRemoveGalleryAsset: ProductVariant;
  productVariantReorderGallery: ProductVariant;
  sendEmail: Scalars['String']['output'];
  /** Create a new billable action. */
  stripeBillableActionCreatePrivileged: StripeBillableAction;
  /** Delete a billable action. */
  stripeBillableActionDeletePrivileged: OperationResult;
  /** Update a billable action. */
  stripeBillableActionUpdatePrivileged: StripeBillableAction;
  submitForm: FormUserData;
  supportTicketAssign: SupportTicket;
  supportTicketCommentCreatePrivileged: SupportTicketComment;
  supportTicketCreate: SupportTicket;
  supportTicketUpdatePrivileged: SupportTicket;
  supportTicketUpdateStatusPrivileged: SupportTicket;
  waitListCreatePrivileged: WaitList;
  waitListDeletePrivileged: OperationResult;
  waitListEntryCreate: WaitListEntry;
  waitListEntryDelete: OperationResult;
  waitListUpdatePrivileged: WaitList;
  warehouseCreate: Warehouse;
  warehouseDelete: OperationResult;
  warehouseInventoryCreate: WarehouseInventory;
  warehouseInventoryDelete: OperationResult;
  warehouseInventoryUpdate: WarehouseInventory;
  warehouseUpdate: Warehouse;
};


export type MutationAccountAccessRoleAssignmentCreatePrivilegedArgs = {
  input: AccessRoleAssignmentCreateInput;
};


export type MutationAccountAccessRoleAssignmentRevokePrivilegedArgs = {
  input: AccessRoleAssignmentRevokeInput;
};


export type MutationAccountAccessRoleCreatePrivilegedArgs = {
  input: AccessRoleCreateInput;
};


export type MutationAccountAccessRoleDeletePrivilegedArgs = {
  input: AccessRoleInput;
};


export type MutationAccountAccessRoleUpdatePrivilegedArgs = {
  input: AccessRoleUpdateInput;
};


export type MutationAccountAuthenticationEmailVerificationVerifyArgs = {
  input: AccountEmailVerificationVerifyInput;
};


export type MutationAccountAuthenticationPasswordVerifyArgs = {
  input: AccountPasswordVerifyInput;
};


export type MutationAccountAuthenticationRegistrationCompleteArgs = {
  input: AccountRegistrationCompleteInput;
};


export type MutationAccountAuthenticationRegistrationOrSignInCreateArgs = {
  input: AccountRegistrationOrSignInCreateInput;
};


export type MutationAccountDeleteArgs = {
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAccountDeletePrivilegedArgs = {
  input: AccountDeleteInput;
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


export type MutationAccountEntitlementCreatePrivilegedArgs = {
  input: EntitlementCreateInput;
};


export type MutationAccountEntitlementDeletePrivilegedArgs = {
  input: EntitlementInput;
};


export type MutationAccountEntitlementUpdatePrivilegedArgs = {
  input: EntitlementUpdateInput;
};


export type MutationAccountPasswordUpdateArgs = {
  input: AccountPasswordUpdateInput;
};


export type MutationAccountProfileEntitlementCreatePrivilegedArgs = {
  input: ProfileEntitlementCreateInput;
};


export type MutationAccountProfileEntitlementDeletePrivilegedArgs = {
  input: ProfileEntitlementInput;
};


export type MutationAccountProfileUpdateArgs = {
  input: AccountProfileUpdateInput;
};


export type MutationAccountSessionDeleteArgs = {
  input: AccountSessionDeleteInput;
};


export type MutationCommerceCheckoutSessionCreateDirectArgs = {
  input: CommerceCheckoutSessionCreateDirectInput;
};


export type MutationCommerceCreateFulfillmentArgs = {
  input: CreateFulfillmentInput;
};


export type MutationCommerceOrderCancelArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationCommerceOrderRefundArgs = {
  input: CreateOrderRefundInput;
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


export type MutationCommerceRefundRequestRejectPrivilegedArgs = {
  id: Scalars['String']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};


export type MutationCommerceVendorCreateArgs = {
  input: CreateVendorInput;
};


export type MutationCommerceVendorUpdateArgs = {
  input: UpdateVendorInput;
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


export type MutationEngagementEventCreateArgs = {
  input: CreateEngagementEventInput;
};


export type MutationEngagementEventsCreateArgs = {
  inputs: Array<CreateEngagementEventInput>;
};


export type MutationFlowAbortPrivilegedArgs = {
  objectId: Scalars['String']['input'];
};


export type MutationFlowCancelPrivilegedArgs = {
  objectId: Scalars['String']['input'];
  timeout?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationFlowPurgeByDatePrivilegedArgs = {
  date: Scalars['DateTimeISO']['input'];
};


export type MutationFlowPurgePrivilegedArgs = {
  objectId: Scalars['String']['input'];
};


export type MutationFlowSubscribeArgs = {
  input: FlowSubscribeInput;
};


export type MutationFlowUnsubscribeArgs = {
  input: FlowSubscribeInput;
};


export type MutationFormArchiveArgs = {
  id: Scalars['String']['input'];
};


export type MutationFormCreateArgs = {
  input: FormCreateInput;
};


export type MutationFormForkArgs = {
  id: Scalars['String']['input'];
};


export type MutationFormPublishArgs = {
  id: Scalars['String']['input'];
};


export type MutationFormUpdateArgs = {
  id: Scalars['String']['input'];
  input: FormUpdateInput;
};


export type MutationGridCapabilityCreatePrivilegedArgs = {
  input: GridCapabilityCreateInput;
};


export type MutationGridCapabilityDeletePrivilegedArgs = {
  input: GridCapabilityInput;
};


export type MutationGridCapabilityUpdatePrivilegedArgs = {
  input: GridCapabilityUpdateInput;
};


export type MutationGridCloudProviderCreatePrivilegedArgs = {
  input: GridCloudProviderCreateInput;
};


export type MutationGridCloudProviderDeletePrivilegedArgs = {
  input: GridCloudProviderInput;
};


export type MutationGridCloudProviderUpdatePrivilegedArgs = {
  input: GridCloudProviderUpdateInput;
};


export type MutationGridNodeCapabilityCreatePrivilegedArgs = {
  input: GridNodeCapabilityAssignInput;
};


export type MutationGridNodeCapabilityDeletePrivilegedArgs = {
  input: GridNodeCapabilityRemoveInput;
};


export type MutationGridNodeCreatePrivilegedArgs = {
  input: GridNodeCreateInput;
};


export type MutationGridNodeDeletePrivilegedArgs = {
  input: GridNodeInput;
};


export type MutationGridNodeUpdatePrivilegedArgs = {
  input: GridNodeUpdateInput;
};


export type MutationGridProviderRegionCapabilityCreatePrivilegedArgs = {
  input: GridProviderRegionCapabilityAssignInput;
};


export type MutationGridProviderRegionCapabilityDeletePrivilegedArgs = {
  input: GridProviderRegionCapabilityRemoveInput;
};


export type MutationGridProviderRegionCreatePrivilegedArgs = {
  input: GridProviderRegionCreateInput;
};


export type MutationGridProviderRegionDeletePrivilegedArgs = {
  input: GridProviderRegionInput;
};


export type MutationGridProviderRegionUpdatePrivilegedArgs = {
  input: GridProviderRegionUpdateInput;
};


export type MutationGridRegionCreatePrivilegedArgs = {
  input: GridRegionCreateInput;
};


export type MutationGridRegionDeletePrivilegedArgs = {
  input: GridRegionInput;
};


export type MutationGridRegionUpdatePrivilegedArgs = {
  input: GridRegionUpdateInput;
};


export type MutationGridTaskCapabilityCreatePrivilegedArgs = {
  input: GridTaskCapabilityCreateInput;
};


export type MutationGridTaskCapabilityDeletePrivilegedArgs = {
  input: GridTaskCapabilityDeleteInput;
};


export type MutationGridTaskCapabilityUpdatePrivilegedArgs = {
  input: GridTaskCapabilityUpdateInput;
};


export type MutationGridTaskCreatePrivilegedArgs = {
  input: GridTaskCreateInput;
};


export type MutationGridTaskDeletePrivilegedArgs = {
  input: GridTaskInput;
};


export type MutationGridTaskProviderSupportCreatePrivilegedArgs = {
  input: GridTaskProviderSupportCreateInput;
};


export type MutationGridTaskProviderSupportDeletePrivilegedArgs = {
  input: GridTaskProviderSupportDeleteInput;
};


export type MutationGridTaskUpdatePrivilegedArgs = {
  input: GridTaskUpdateInput;
};


export type MutationNetworkToolDnsCreateArgs = {
  input: NetworkToolDnsCreateInput;
};


export type MutationNetworkToolPingCreateArgs = {
  input: NetworkToolPingCreateInput;
};


export type MutationNetworkToolPortCheckCreateArgs = {
  input: NetworkToolPortCheckCreateInput;
};


export type MutationNetworkToolTlsCertificateCreateArgs = {
  input: NetworkToolTlsCertificateCreateInput;
};


export type MutationNetworkToolTracerouteCreateArgs = {
  input: NetworkToolTracerouteCreateInput;
};


export type MutationNetworkToolWhoisCreateArgs = {
  input: NetworkToolWhoisCreateInput;
};


export type MutationPostCommentCreateArgs = {
  input: PostCommentCreateInput;
};


export type MutationPostCommentDeleteArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostCreatePrivilegedArgs = {
  input: PostCreateInput;
};


export type MutationPostDeleteArgs = {
  id: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPostDeletePrivilegedArgs = {
  id: Scalars['String']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};


export type MutationPostDraftArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostPublishArgs = {
  id: Scalars['String']['input'];
};


export type MutationPostPublishPrivilegedArgs = {
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


export type MutationPostUpdatePrivilegedArgs = {
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


export type MutationStripeBillableActionCreatePrivilegedArgs = {
  input: StripeBillableActionCreateInput;
};


export type MutationStripeBillableActionDeletePrivilegedArgs = {
  input: StripeBillableActionInput;
};


export type MutationStripeBillableActionUpdatePrivilegedArgs = {
  input: StripeBillableActionUpdateInput;
};


export type MutationSubmitFormArgs = {
  data: Scalars['JSON']['input'];
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  identifier: Scalars['String']['input'];
};


export type MutationSupportTicketAssignArgs = {
  ticketId: Scalars['String']['input'];
  username?: InputMaybe<Scalars['String']['input']>;
};


export type MutationSupportTicketCommentCreatePrivilegedArgs = {
  input: SupportTicketCommentCreateInput;
};


export type MutationSupportTicketCreateArgs = {
  input: SupportTicketCreateInput;
};


export type MutationSupportTicketUpdatePrivilegedArgs = {
  input: SupportTicketUpdateInput;
};


export type MutationSupportTicketUpdateStatusPrivilegedArgs = {
  id: Scalars['String']['input'];
  status: SupportTicketStatus;
};


export type MutationWaitListCreatePrivilegedArgs = {
  data: WaitListCreationInput;
};


export type MutationWaitListDeletePrivilegedArgs = {
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


export type MutationWaitListUpdatePrivilegedArgs = {
  input: WaitListUpdateInput;
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

export type NetworkToolDnsCreateInput = {
  domain: Scalars['String']['input'];
  region: GridRegionLevelsInput;
  types?: InputMaybe<Array<DnsRecordType>>;
};

export type NetworkToolHistoryInput = {
  networkTool: Scalars['String']['input'];
};

export type NetworkToolPingCreateInput = {
  count: Scalars['Float']['input'];
  host: Scalars['String']['input'];
  region: GridRegionLevelsInput;
  timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type NetworkToolPortCheckCreateInput = {
  host: Scalars['String']['input'];
  port: Scalars['Float']['input'];
  region: GridRegionLevelsInput;
  timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type NetworkToolTlsCertificateCreateInput = {
  host: Scalars['String']['input'];
  port: Scalars['Float']['input'];
  region: GridRegionLevelsInput;
  timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type NetworkToolTracerouteCreateInput = {
  host: Scalars['String']['input'];
  maxHops?: InputMaybe<Scalars['Float']['input']>;
  queryCount?: InputMaybe<Scalars['Float']['input']>;
  region: GridRegionLevelsInput;
  timeoutMs?: InputMaybe<Scalars['Float']['input']>;
  waitTime?: InputMaybe<Scalars['Float']['input']>;
};

export type NetworkToolWhoisCreateInput = {
  host: Scalars['String']['input'];
  region: GridRegionLevelsInput;
  timeoutMs?: InputMaybe<Scalars['Float']['input']>;
};

export type OperationResult = {
  __typename?: 'OperationResult';
  success: Scalars['Boolean']['output'];
};

/** The order direction of a query */
export enum OrderByDirection {
  Ascending = 'Ascending',
  Descending = 'Descending'
}

export type OrderByInput = {
  direction?: InputMaybe<OrderByDirection>;
  key: Scalars['String']['input'];
};

export type OrderLineItemInput = {
  indexId: Scalars['Int']['input'];
  productVariantId: Scalars['String']['input'];
  quantity: Scalars['Int']['input'];
};

export type PagedAccessRoleAssignments = {
  __typename?: 'PagedAccessRoleAssignments';
  items: Array<AccessRoleAssignment>;
  pagination: Pagination;
};

export type PagedAccounts = {
  __typename?: 'PagedAccounts';
  items: Array<Account>;
  pagination: Pagination;
};

export type PagedContactResult = {
  __typename?: 'PagedContactResult';
  items: Array<Contact>;
  pagination: Pagination;
};

export type PagedDatabasesResult = {
  __typename?: 'PagedDatabasesResult';
  items: Array<DatebaseMetadata>;
  pagination: Pagination;
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
  pagination: Pagination;
};

export type PagedPostReactionProfile = {
  __typename?: 'PagedPostReactionProfile';
  items: Array<PostReactionProfile>;
  pagination: Pagination;
};

export type PagedPostReports = {
  __typename?: 'PagedPostReports';
  items: Array<PostReport>;
  pagination: Pagination;
};

export type PagedPostRevisions = {
  __typename?: 'PagedPostRevisions';
  items: Array<PostRevision>;
  pagination: Pagination;
};

export type PagedPosts = {
  __typename?: 'PagedPosts';
  items: Array<Post>;
  pagination: Pagination;
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

export type PaginationFlowExecutionResult = {
  __typename?: 'PaginationFlowExecutionResult';
  items: Array<FlowExecution>;
  pagination: Pagination;
};

export type PaginationFormResult = {
  __typename?: 'PaginationFormResult';
  items: Array<Form>;
  pagination: Pagination;
};

export type PaginationFulfillmentOrderResult = {
  __typename?: 'PaginationFulfillmentOrderResult';
  items: Array<FulfillmentOrder>;
  pagination: Pagination;
};

export type PaginationGridCapability = {
  __typename?: 'PaginationGridCapability';
  items: Array<GridCapability>;
  pagination: Pagination;
};

export type PaginationInput = {
  filters?: InputMaybe<Array<ColumnFilterInput>>;
  itemIndex?: InputMaybe<Scalars['Int']['input']>;
  itemsPerPage: Scalars['Int']['input'];
  orderBy?: InputMaybe<Array<OrderByInput>>;
};

export type PaginationInputWithFilters = {
  filters?: InputMaybe<Array<ColumnFilter>>;
  itemIndex?: InputMaybe<Scalars['Int']['input']>;
  itemsPerPage: Scalars['Int']['input'];
};

export type PaginationNetworkToolHistoryResult = {
  __typename?: 'PaginationNetworkToolHistoryResult';
  items: Array<FlowExecution>;
  pagination: Pagination;
};

export type PaginationOrderResult = {
  __typename?: 'PaginationOrderResult';
  items: Array<CommerceOrder>;
  pagination: Pagination;
};

export type PaginationRefundResult = {
  __typename?: 'PaginationRefundResult';
  items: Array<Refund>;
  pagination: Pagination;
};

export type PaginationSupportTicketResult = {
  __typename?: 'PaginationSupportTicketResult';
  items: Array<SupportTicket>;
  pagination: Pagination;
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

export enum PaymentMethodType {
  AppleInAppPurchase = 'AppleInAppPurchase',
  CreditCard = 'CreditCard'
}

export enum PaymentProcessorType {
  AppleInAppPurchase = 'AppleInAppPurchase',
  Stripe = 'Stripe',
  StripeEmbedded = 'StripeEmbedded',
  StripeProxy = 'StripeProxy',
  Test = 'Test'
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
  pagination: PaginationInput;
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
  pagination: Pagination;
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

export type ProductsPaginationResult = {
  __typename?: 'ProductsPaginationResult';
  items: Array<Product>;
  pagination: Pagination;
};

export type Profile = {
  __typename?: 'Profile';
  birthday?: Maybe<Scalars['DateTimeISO']['output']>;
  countryCode?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  displayName?: Maybe<Scalars['String']['output']>;
  entitlements?: Maybe<Array<ProfileEntitlement>>;
  familyName?: Maybe<Scalars['String']['output']>;
  gender?: Maybe<Scalars['String']['output']>;
  givenName?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  /** Profile asset URL */
  images?: Maybe<Array<ImageObject>>;
  locale?: Maybe<Scalars['String']['output']>;
  middleName?: Maybe<Scalars['String']['output']>;
  preferredName?: Maybe<Scalars['String']['output']>;
  timezone?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTimeISO']['output'];
  username: Scalars['String']['output'];
};

export type ProfileEntitlement = {
  __typename?: 'ProfileEntitlement';
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  entitlement: Entitlement;
  entitlementId: Scalars['String']['output'];
  expiresAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['String']['output'];
  profile: Profile;
  profileId: Scalars['String']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type ProfileEntitlementCreateInput = {
  entitlementId: Scalars['String']['input'];
  expiresAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  profileId: Scalars['String']['input'];
};

export type ProfileEntitlementInput = {
  id: Scalars['String']['input'];
};

export type ProfileEntitlementListInput = {
  entitlementId?: InputMaybe<Scalars['String']['input']>;
  profileId?: InputMaybe<Scalars['String']['input']>;
};

export type PublicCommerceOrder = {
  __typename?: 'PublicCommerceOrder';
  appliedDiscounts?: Maybe<Array<CommerceOrderDiscount>>;
  createdAt: Scalars['DateTimeISO']['output'];
  fulfillmentStatus: CommerceOrderFulfillmentStatus;
  identifier: Scalars['String']['output'];
  lineItems?: Maybe<Array<PublicCommerceOrderLineItem>>;
  paymentStatus?: Maybe<PaymentStatus>;
  priceInfo: CommerceOrderPrice;
  shipments?: Maybe<Array<PublicShipment>>;
  source: Scalars['String']['output'];
  status: CommerceOrderStatus;
};

export type PublicCommerceOrderLineItem = {
  __typename?: 'PublicCommerceOrderLineItem';
  id: Scalars['String']['output'];
  indexId: Scalars['Int']['output'];
  productVariantId: Scalars['String']['output'];
  quantity: Scalars['Int']['output'];
  status: CommerceOrderLineItemStatus;
};

export type PublicProfile = {
  __typename?: 'PublicProfile';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  displayName?: Maybe<Scalars['String']['output']>;
  images?: Maybe<Array<ImageObject>>;
  username: Scalars['String']['output'];
};

export type PublicShipment = {
  __typename?: 'PublicShipment';
  cancelledAt?: Maybe<Scalars['DateTimeISO']['output']>;
  createdAt: Scalars['DateTimeISO']['output'];
  deliveredAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deliveryStatus: DeliveryStatus;
  label?: Maybe<ShippingLabel>;
  orderIndexId: Scalars['Int']['output'];
  packageInfo: ShippingPackageInfo;
  shippedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  status: ShipmentStatus;
};

export type Query = {
  __typename?: 'Query';
  account: Account;
  /** Get all access roles assigned to an account. */
  accountAccessRoleAssignmentsPrivileged: PagedAccessRoleAssignments;
  /** Get a single access role by ID or type. */
  accountAccessRolePrivileged?: Maybe<AccessRole>;
  /** Get all access roles. */
  accountAccessRolesPrivileged: Array<AccessRole>;
  accountAuthentication?: Maybe<AuthenticationSession>;
  accountAuthenticationEmailVerification?: Maybe<AuthenticationEmailVerification>;
  accountEmailAddresses: AccountEmailAddressesResult;
  accountEmailVerification: EmailVerification;
  /** Get a single entitlement by ID or featureKey. */
  accountEntitlementPrivileged?: Maybe<Entitlement>;
  /** Get all entitlements. */
  accountEntitlementsPrivileged: Array<Entitlement>;
  accountPrivileged?: Maybe<Account>;
  /** Get a single profile entitlement by ID. */
  accountProfileEntitlementPrivileged?: Maybe<ProfileEntitlement>;
  /** Get all profile entitlements. */
  accountProfileEntitlementsPrivileged: Array<ProfileEntitlement>;
  accountProfilePublic?: Maybe<PublicProfile>;
  accountProfileUsernameValidate: UniqueFieldValidationResult;
  accountSessions: Array<AccountSession>;
  accountsPrivileged: PagedAccounts;
  appleStoreTransactionWithOrderInfo?: Maybe<AppleStoreTransactionOrderMapping>;
  commerceCheckoutSession: CommerceCheckoutSession;
  commerceCheckoutSessionLatest: CommerceCheckoutSession;
  commerceOrder: CommerceOrderResult;
  commerceOrderPrivileged: CommerceOrder;
  commerceOrders: PaginationOrderResult;
  commerceOrdersByCheckoutSession: Array<CommerceOrderResult>;
  commerceOrdersPrivileged: PaginationOrderResult;
  commerceOrdersReadyToFulfill: PaginationFulfillmentOrderResult;
  commerceProduct: Product;
  commerceProductBundle: ProductBundle;
  commerceProductBundles: ProductBundlesPaginationResult;
  commerceProductPrivileged: Product;
  commerceProducts: ProductsPaginationResult;
  commerceProductsPrivileged: ProductsPaginationResult;
  commerceRefundRequestsPrivileged: PaginationRefundResult;
  commerceVendor: Vendor;
  commerceVendors: VendorsResult;
  contact: Contact;
  contacts: PagedContactResult;
  dataInteractionDatabaseTable: DatabaseTableMetadata;
  dataInteractionDatabaseTableMetrics: Array<DataInteractionDatabaseMetrics>;
  dataInteractionDatabaseTableRow: DatabaseTableRowData;
  dataInteractionDatabaseTableRows: DatabaseTableMetadataWithRows;
  dataInteractionDatabaseTables: DatabaseTablesResult;
  dataInteractionDatabases: PagedDatabasesResult;
  discordWebhookQuery: OperationResult;
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
  engagementEvents: Array<EngagementEvent>;
  engagementOverview: EngagementOverview;
  flowExecution?: Maybe<FlowExecution>;
  flowExecutionHistory: PaginationFlowExecutionResult;
  flowInfoPrivileged: Scalars['JSON']['output'];
  form: Form;
  formPrivileged: Form;
  formsPrivileged: PaginationFormResult;
  /** Get all capabilities. */
  gridCapabilitiesPrivileged: Array<PaginationGridCapability>;
  /** Get a capability by ID or name. */
  gridCapabilityPrivileged?: Maybe<GridCapability>;
  /** Get a grid cloud provider by ID or name. */
  gridCloudProviderPrivileged?: Maybe<GridCloudProvider>;
  /** Get all grid cloud providers. */
  gridCloudProvidersPrivileged: Array<GridCloudProvider>;
  /** Get all node capabilities. */
  gridNodeCapabilitiesPrivileged: Array<GridNodeCapability>;
  /** Get a node by ID or name. */
  gridNodePrivileged?: Maybe<GridNode>;
  /** Get all nodes. */
  gridNodesPrivileged: Array<GridNode>;
  /** Get all provider region capabilities. */
  gridProviderRegionCapabilitiesPrivileged: Array<GridProviderRegionCapability>;
  /** Get a provider region by ID or other criteria. */
  gridProviderRegionPrivleged?: Maybe<GridProviderRegion>;
  /** Get all provider regions. */
  gridProviderRegionsPrivileged: Array<GridProviderRegion>;
  /** Get all regions. */
  gridRegionLevels: Array<GridRegionLevels>;
  /** Get a region by ID or name. */
  gridRegionPrivileged?: Maybe<GridRegion>;
  /** Get all regions. */
  gridRegionsPrivileged: Array<GridRegion>;
  /** Get all task type capabilities. */
  gridTaskCapabilitiesPrivileged: Array<GridTaskCapability>;
  /** Get a specific task execution. */
  gridTaskExecutionPrivileged?: Maybe<GridTaskExecution>;
  /** Get task executions. */
  gridTaskExecutionsPrivileged: Array<GridTaskExecution>;
  /** Get a task type by ID, name, or name and version. */
  gridTaskPrivileged?: Maybe<GridTask>;
  /** Get all task provider supports. */
  gridTaskProviderSupportPrivileged: Array<GridTaskProviderSupport>;
  /** Get all task types. */
  gridTasksPrivileged: Array<GridTask>;
  networkToolHistory: PaginationNetworkToolHistoryResult;
  post: Post;
  postComments: PagedPostComments;
  postPrivileged: Post;
  postReactionProfiles: PagedPostReactionProfile;
  postReports: PagedPostReports;
  postTopic: PostTopicQueryResult;
  postTopicById: PostTopic;
  postTopics: Array<PostTopic>;
  posts: PagedPosts;
  postsByTopic: PagedPosts;
  postsMine: PagedPosts;
  postsPrivileged: PagedPosts;
  queryOrderPrice: QueryCommerceOrderPriceResult;
  /** Get a single billable action by ID or billableAction. */
  stripeBillableActionPrivileged?: Maybe<StripeBillableAction>;
  /** List all billable actions. */
  stripeBillableActionsPrivileged: Array<StripeBillableAction>;
  supportAllSupportProfiles: Array<PublicProfile>;
  supportTickets: PaginationSupportTicketResult;
  supportTicketsPrivileged: PaginationSupportTicketResult;
  waitListEntriesPrivileged: WaitListEntriesResult;
  waitLists: WaitListResult;
  waitListsPrivileged: WaitListResult;
  warehouse: Warehouse;
  warehouses: Array<Warehouse>;
};


export type QueryAccountAccessRoleAssignmentsPrivilegedArgs = {
  pagination: PaginationInput;
  statuses?: InputMaybe<Array<AccessRoleStatus>>;
};


export type QueryAccountAccessRolePrivilegedArgs = {
  input: AccessRoleInput;
};


export type QueryAccountAccessRolesPrivilegedArgs = {
  input?: InputMaybe<AccessRoleListInput>;
};


export type QueryAccountEntitlementPrivilegedArgs = {
  input: EntitlementInput;
};


export type QueryAccountEntitlementsPrivilegedArgs = {
  input?: InputMaybe<EntitlementListInput>;
};


export type QueryAccountPrivilegedArgs = {
  input: AccountInput;
};


export type QueryAccountProfileEntitlementPrivilegedArgs = {
  input: ProfileEntitlementInput;
};


export type QueryAccountProfileEntitlementsPrivilegedArgs = {
  input?: InputMaybe<ProfileEntitlementListInput>;
};


export type QueryAccountProfilePublicArgs = {
  username: Scalars['String']['input'];
};


export type QueryAccountProfileUsernameValidateArgs = {
  username: Scalars['String']['input'];
};


export type QueryAccountsPrivilegedArgs = {
  pagination: PaginationInput;
};


export type QueryAppleStoreTransactionWithOrderInfoArgs = {
  transactionId: Scalars['String']['input'];
};


export type QueryCommerceCheckoutSessionArgs = {
  id: Scalars['String']['input'];
};


export type QueryCommerceOrderArgs = {
  identifier: Scalars['String']['input'];
};


export type QueryCommerceOrderPrivilegedArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommerceOrdersArgs = {
  pagination: PaginationInput;
};


export type QueryCommerceOrdersByCheckoutSessionArgs = {
  checkoutSessionId: Scalars['String']['input'];
};


export type QueryCommerceOrdersPrivilegedArgs = {
  pagination: PaginationInput;
};


export type QueryCommerceOrdersReadyToFulfillArgs = {
  pagination: PaginationInput;
};


export type QueryCommerceProductArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommerceProductBundleArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommerceProductBundlesArgs = {
  pagination: PaginationInput;
};


export type QueryCommerceProductPrivilegedArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommerceProductsArgs = {
  pagination: PaginationInput;
};


export type QueryCommerceProductsPrivilegedArgs = {
  pagination: PaginationInput;
};


export type QueryCommerceRefundRequestsPrivilegedArgs = {
  pagination: PaginationInput;
};


export type QueryCommerceVendorArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCommerceVendorsArgs = {
  pagination: PaginationInput;
};


export type QueryContactArgs = {
  id: Scalars['String']['input'];
};


export type QueryContactsArgs = {
  pagination: PaginationInput;
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
  filters?: InputMaybe<ColumnFilterGroupInput>;
  pagination: PaginationInput;
  tableName: Scalars['String']['input'];
};


export type QueryDataInteractionDatabaseTablesArgs = {
  databaseName?: InputMaybe<Scalars['String']['input']>;
  pagination: PaginationInput;
};


export type QueryDataInteractionDatabasesArgs = {
  pagination: PaginationInput;
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


export type QueryFlowExecutionArgs = {
  input: FlowExecutionInput;
};


export type QueryFlowExecutionHistoryArgs = {
  input: FlowExecutionHistoryInput;
  pagination: PaginationInput;
};


export type QueryFlowInfoPrivilegedArgs = {
  objectId: Scalars['String']['input'];
};


export type QueryFormArgs = {
  identifier: Scalars['String']['input'];
};


export type QueryFormPrivilegedArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type QueryFormsPrivilegedArgs = {
  pagination: PaginationInput;
};


export type QueryGridCapabilitiesPrivilegedArgs = {
  pagination: PaginationInput;
};


export type QueryGridCapabilityPrivilegedArgs = {
  input: GridCapabilityInput;
};


export type QueryGridCloudProviderPrivilegedArgs = {
  input: GridCloudProviderInput;
};


export type QueryGridCloudProvidersPrivilegedArgs = {
  input?: InputMaybe<GridCloudProviderListInput>;
};


export type QueryGridNodeCapabilitiesPrivilegedArgs = {
  input?: InputMaybe<GridNodeCapabilityListInput>;
  pagination: PaginationInput;
};


export type QueryGridNodePrivilegedArgs = {
  input: GridNodeInput;
};


export type QueryGridNodesPrivilegedArgs = {
  input?: InputMaybe<GridNodeListInput>;
  pagination: PaginationInput;
};


export type QueryGridProviderRegionCapabilitiesPrivilegedArgs = {
  input?: InputMaybe<GridProviderRegionCapabilityListInput>;
};


export type QueryGridProviderRegionPrivlegedArgs = {
  input: GridProviderRegionInput;
};


export type QueryGridProviderRegionsPrivilegedArgs = {
  input?: InputMaybe<GridProviderRegionListInput>;
};


export type QueryGridRegionLevelsArgs = {
  input: GridRegionLevelsListInput;
};


export type QueryGridRegionPrivilegedArgs = {
  input: GridRegionInput;
};


export type QueryGridRegionsPrivilegedArgs = {
  input?: InputMaybe<GridRegionListInput>;
};


export type QueryGridTaskCapabilitiesPrivilegedArgs = {
  input?: InputMaybe<GridTaskCapabilityListInput>;
};


export type QueryGridTaskExecutionPrivilegedArgs = {
  input: GridTaskExecutionInput;
};


export type QueryGridTaskExecutionsPrivilegedArgs = {
  input?: InputMaybe<GridTaskExecutionListInput>;
  pagination: PaginationInput;
};


export type QueryGridTaskPrivilegedArgs = {
  input: GridTaskInput;
};


export type QueryGridTaskProviderSupportPrivilegedArgs = {
  input?: InputMaybe<TaskProviderSupportListInput>;
};


export type QueryGridTasksPrivilegedArgs = {
  input?: InputMaybe<GridTaskListInput>;
};


export type QueryNetworkToolHistoryArgs = {
  input: NetworkToolHistoryInput;
  pagination: PaginationInput;
};


export type QueryPostArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostCommentsArgs = {
  pagination: PaginationInput;
  postId: Scalars['String']['input'];
  threadId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostPrivilegedArgs = {
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostReactionProfilesArgs = {
  commentId?: InputMaybe<Scalars['String']['input']>;
  content: Scalars['String']['input'];
  pagination: PaginationInput;
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostReportsArgs = {
  commentId?: InputMaybe<Scalars['String']['input']>;
  pagination: PaginationInput;
  postId?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPostTopicArgs = {
  pagination: PaginationInput;
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
  pagination: PaginationInput;
};


export type QueryPostsByTopicArgs = {
  id: Scalars['String']['input'];
  pagination: PaginationInput;
};


export type QueryPostsMineArgs = {
  pagination: PaginationInput;
};


export type QueryPostsPrivilegedArgs = {
  pagination: PaginationInput;
};


export type QueryQueryOrderPriceArgs = {
  input: QueryCommerceOrderPriceInput;
};


export type QueryStripeBillableActionPrivilegedArgs = {
  input: StripeBillableActionInput;
};


export type QueryStripeBillableActionsPrivilegedArgs = {
  input?: InputMaybe<StripeBillableActionListInput>;
};


export type QuerySupportTicketsArgs = {
  pagination: PaginationInput;
};


export type QuerySupportTicketsPrivilegedArgs = {
  pagination: PaginationInput;
};


export type QueryWaitListEntriesPrivilegedArgs = {
  pagination: PaginationInput;
  waitListId?: InputMaybe<Scalars['String']['input']>;
  waitListIdentifier?: InputMaybe<Scalars['String']['input']>;
};


export type QueryWaitListsArgs = {
  pagination: PaginationInput;
};


export type QueryWaitListsPrivilegedArgs = {
  pagination: PaginationInput;
};


export type QueryWarehouseArgs = {
  id: Scalars['String']['input'];
};

export type QueryCommerceOrderPriceInput = {
  emailAddress?: InputMaybe<Scalars['String']['input']>;
  lineItems: Array<OrderLineItemInput>;
  metadata?: InputMaybe<Scalars['JSON']['input']>;
  shippingAddress?: InputMaybe<StreetAddressInput>;
};

export type QueryCommerceOrderPriceResult = {
  __typename?: 'QueryCommerceOrderPriceResult';
  appliedDiscounts: Array<CommerceOrderDiscount>;
  orderPrice: CommerceOrderPrice;
};

export type Refund = {
  __typename?: 'Refund';
  amount?: Maybe<Scalars['MonetaryDecimal']['output']>;
  commerceOrder?: Maybe<CommerceOrder>;
  commerceOrderId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  items: Array<RefundItem>;
  metadata?: Maybe<Scalars['JSON']['output']>;
  reason?: Maybe<Scalars['String']['output']>;
  status: RefundStatus;
  statusRecords?: Maybe<Array<StatusRecord>>;
  updatedAt: Scalars['DateTimeISO']['output'];
};

export type RefundItem = {
  __typename?: 'RefundItem';
  lineItemId: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
};

/** The status of a refund. */
export enum RefundStatus {
  Cancelled = 'Cancelled',
  Created = 'Created',
  Failed = 'Failed',
  Issued = 'Issued',
  Pending = 'Pending',
  Rejected = 'Rejected',
  RequiresAction = 'RequiresAction'
}

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
  packageInfo: ShippingPackageInfo;
  shippedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  source: Scalars['String']['output'];
  status: ShipmentStatus;
  statusDescription?: Maybe<Scalars['String']['output']>;
  toAddress: StreetAddressObject;
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
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

export type ShippingPackageInfo = {
  __typename?: 'ShippingPackageInfo';
  items: Array<ShippingPackageItem>;
  packageIndexId: Scalars['Float']['output'];
};

export type ShippingPackageItem = {
  __typename?: 'ShippingPackageItem';
  indexId: Scalars['Float']['output'];
  quantity: Scalars['Float']['output'];
};

export enum ShippingServiceType {
  UpsGround = 'UPSGround',
  UspsFirstClassMail = 'USPSFirstClassMail',
  UspsMediaMail = 'USPSMediaMail',
  UspsParcelSelect = 'USPSParcelSelect',
  UspsPriorityMail = 'USPSPriorityMail',
  UspsPriorityMailExpress = 'USPSPriorityMailExpress'
}

export type StatusRecord = {
  __typename?: 'StatusRecord';
  description?: Maybe<Scalars['String']['output']>;
  status: Scalars['String']['output'];
  timestamp: Scalars['DateTimeISO']['output'];
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

export type StripeBillableAction = {
  __typename?: 'StripeBillableAction';
  billableAction: Scalars['String']['output'];
  billableActionLogs: Array<StripeBillableActionLog>;
  createdAt: Scalars['DateTimeISO']['output'];
  createdByAccountId: Scalars['String']['output'];
  createdByProfileId: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  stripeEventName: Scalars['String']['output'];
  unitValue: Scalars['Float']['output'];
  updatedAt: Scalars['DateTimeISO']['output'];
  updatedByAccountId?: Maybe<Scalars['String']['output']>;
  updatedByProfileId?: Maybe<Scalars['String']['output']>;
};

export type StripeBillableActionCreateInput = {
  billableAction: Scalars['String']['input'];
  description: Scalars['String']['input'];
  stripeEventName: Scalars['String']['input'];
  unitValue: Scalars['Float']['input'];
};

export type StripeBillableActionInput = {
  billableAction?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
};

export type StripeBillableActionListInput = {
  stripeEventName?: InputMaybe<Scalars['String']['input']>;
};

export type StripeBillableActionLog = {
  __typename?: 'StripeBillableActionLog';
  billableAction: StripeBillableAction;
  billableActionId: Scalars['String']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  meteredEventLog: StripeMeteredEventLog;
  meteredEventLogId: Scalars['String']['output'];
  sourceId: Scalars['String']['output'];
  sourceType: Scalars['String']['output'];
  timestamp: Scalars['DateTimeISO']['output'];
  value: Scalars['Float']['output'];
};

export type StripeBillableActionUpdateInput = {
  billableAction?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['String']['input'];
  stripeEventName?: InputMaybe<Scalars['String']['input']>;
  unitValue?: InputMaybe<Scalars['Float']['input']>;
};

export type StripeCustomer = {
  __typename?: 'StripeCustomer';
  createdAt: Scalars['DateTimeISO']['output'];
  id: Scalars['String']['output'];
  stripeCustomerId: Scalars['String']['output'];
};

export type StripeMeteredEventLog = {
  __typename?: 'StripeMeteredEventLog';
  createdAt: Scalars['DateTimeISO']['output'];
  customerId: Scalars['String']['output'];
  eventName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  idempotencyKey: Scalars['String']['output'];
  requestId: Scalars['String']['output'];
  status: StripeMeteredEventLogStatus;
  stripeCustomer: StripeCustomer;
  timestamp: Scalars['DateTimeISO']['output'];
  value: Scalars['Float']['output'];
};

/** The status of the Stripe metered event log. */
export enum StripeMeteredEventLogStatus {
  Failed = 'Failed',
  Pending = 'Pending',
  Success = 'Success'
}

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
  updatedAt: Scalars['DateTimeISO']['output'];
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
  replyToCommentId?: InputMaybe<Scalars['String']['input']>;
  ticketIdentifier: Scalars['String']['input'];
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

export type TaskProviderSupportListInput = {
  cloudProviderId?: InputMaybe<Scalars['String']['input']>;
  taskId?: InputMaybe<Scalars['String']['input']>;
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
  attributeToUpsert?: InputMaybe<ProductVariantAttributeInput>;
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

export type Vendor = {
  __typename?: 'Vendor';
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
  pagination: PaginationInput;
};

export enum VendorStatus {
  Active = 'Active',
  Archived = 'Archived',
  Inactive = 'Inactive'
}

export type VendorsResult = {
  __typename?: 'VendorsResult';
  items: Array<Vendor>;
  pagination: Pagination;
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
  userEnrolled?: Maybe<Scalars['Boolean']['output']>;
};

export type WaitListCreationInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export type WaitListEntriesResult = {
  __typename?: 'WaitListEntriesResult';
  items: Array<WaitListEntry>;
  pagination: Pagination;
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
  pagination: Pagination;
};

export type WaitListUpdateInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['String']['input']>;
  identifier?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

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
  id?: InputMaybe<Scalars['String']['input']>;
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

export type GridRegionLevelsQueryVariables = Exact<{
  input: GridRegionLevelsListInput;
}>;


export type GridRegionLevelsQuery = { __typename?: 'Query', gridRegionLevels: Array<{ __typename?: 'GridRegionLevels', region?: string | null, country?: string | null, division?: string | null, locality?: string | null, site?: string | null }> };

export type NetworkToolPortCheckCreateMutationVariables = Exact<{
  input: NetworkToolPortCheckCreateInput;
}>;


export type NetworkToolPortCheckCreateMutation = { __typename?: 'Mutation', networkToolPortCheckCreate: string };

export type NetworkToolHistoryQueryVariables = Exact<{
  input: NetworkToolHistoryInput;
  pagination: PaginationInput;
}>;


export type NetworkToolHistoryQuery = { __typename?: 'Query', networkToolHistory: { __typename?: 'PaginationNetworkToolHistoryResult', items: Array<{ __typename?: 'FlowExecution', id: string, triggerId?: string | null, triggerType: FlowTriggerType, status: FlowExecutionStatus, metadata?: any | null, flowVersionId?: string | null, elapsedTimeMs?: number | null, startedAt: any, completedAt?: any | null, updatedAt: any, createdAt: any, errors?: Array<any> | null, stepExecutions: Array<{ __typename?: 'FlowStepExecution', stepId: string, status: FlowStepExecutionStatus, actionType: string, attempt: number, input?: any | null, output?: any | null, updatedAt: any, elapsedTimeMs?: number | null, startedAt?: any | null, completedAt?: any | null, createdAt: any, errors?: any | null }> }>, pagination: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, page: number, pagesTotal: number } } };

export type FlowExecutionQueryVariables = Exact<{
  input: FlowExecutionInput;
}>;


export type FlowExecutionQuery = { __typename?: 'Query', flowExecution?: { __typename?: 'FlowExecution', id: string, triggerId?: string | null, triggerType: FlowTriggerType, flowVersionId?: string | null, status: FlowExecutionStatus, input?: any | null, output?: any | null, elapsedTimeMs?: number | null, errors?: Array<any> | null, startedAt: any, completedAt?: any | null, updatedAt: any, createdAt: any, stepExecutions: Array<{ __typename?: 'FlowStepExecution', id: string, stepId: string, flowExecutionId: string, status: FlowStepExecutionStatus, attempt: number, actionType: string, input?: any | null, output?: any | null, elapsedTimeMs?: number | null, startedAt?: any | null, completedAt?: any | null, updatedAt: any, createdAt: any, errors?: any | null }> } | null };

export type FlowExecutionHistoryQueryVariables = Exact<{
  input: FlowExecutionHistoryInput;
  pagination: PaginationInput;
}>;


export type FlowExecutionHistoryQuery = { __typename?: 'Query', flowExecutionHistory: { __typename?: 'PaginationFlowExecutionResult', items: Array<{ __typename?: 'FlowExecution', id: string, triggerId?: string | null, triggerType: FlowTriggerType, flowVersionId?: string | null, status: FlowExecutionStatus, elapsedTimeMs?: number | null, startedAt: any, completedAt?: any | null, updatedAt: any, createdAt: any, errors?: Array<any> | null, stepExecutions: Array<{ __typename?: 'FlowStepExecution', id: string, stepId: string, flowExecutionId: string, status: FlowStepExecutionStatus, attempt: number, actionType: string, input?: any | null, output?: any | null, elapsedTimeMs?: number | null, startedAt?: any | null, completedAt?: any | null, updatedAt: any, createdAt: any, errors?: any | null }> }>, pagination: { __typename?: 'Pagination', itemIndex: number, itemIndexForPreviousPage?: number | null, itemIndexForNextPage?: number | null, itemsPerPage: number, itemsTotal: number, page: number, pagesTotal: number } } };


export const GridRegionLevelsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GridRegionLevels"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"GridRegionLevelsListInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gridRegionLevels"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"region"}},{"kind":"Field","name":{"kind":"Name","value":"country"}},{"kind":"Field","name":{"kind":"Name","value":"division"}},{"kind":"Field","name":{"kind":"Name","value":"locality"}},{"kind":"Field","name":{"kind":"Name","value":"site"}}]}}]}}]} as unknown as DocumentNode<GridRegionLevelsQuery, GridRegionLevelsQueryVariables>;
export const NetworkToolPortCheckCreateDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"NetworkToolPortCheckCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NetworkToolPortCheckCreateInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"networkToolPortCheckCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}]}]}}]} as unknown as DocumentNode<NetworkToolPortCheckCreateMutation, NetworkToolPortCheckCreateMutationVariables>;
export const NetworkToolHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"NetworkToolHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"NetworkToolHistoryInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"networkToolHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"triggerId"}},{"kind":"Field","name":{"kind":"Name","value":"triggerType"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"stepExecutions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"stepId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"attempt"}},{"kind":"Field","name":{"kind":"Name","value":"input"}},{"kind":"Field","name":{"kind":"Name","value":"output"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"elapsedTimeMs"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}},{"kind":"Field","name":{"kind":"Name","value":"metadata"}},{"kind":"Field","name":{"kind":"Name","value":"flowVersionId"}},{"kind":"Field","name":{"kind":"Name","value":"elapsedTimeMs"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}}]}}]}}]}}]} as unknown as DocumentNode<NetworkToolHistoryQuery, NetworkToolHistoryQueryVariables>;
export const FlowExecutionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FlowExecution"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FlowExecutionInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flowExecution"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"triggerId"}},{"kind":"Field","name":{"kind":"Name","value":"triggerType"}},{"kind":"Field","name":{"kind":"Name","value":"flowVersionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"input"}},{"kind":"Field","name":{"kind":"Name","value":"output"}},{"kind":"Field","name":{"kind":"Name","value":"stepExecutions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stepId"}},{"kind":"Field","name":{"kind":"Name","value":"flowExecutionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"attempt"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"input"}},{"kind":"Field","name":{"kind":"Name","value":"output"}},{"kind":"Field","name":{"kind":"Name","value":"elapsedTimeMs"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}},{"kind":"Field","name":{"kind":"Name","value":"elapsedTimeMs"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}}]}}]}}]} as unknown as DocumentNode<FlowExecutionQuery, FlowExecutionQueryVariables>;
export const FlowExecutionHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FlowExecutionHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FlowExecutionHistoryInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"PaginationInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"flowExecutionHistory"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"pagination"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pagination"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"items"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"triggerId"}},{"kind":"Field","name":{"kind":"Name","value":"triggerType"}},{"kind":"Field","name":{"kind":"Name","value":"flowVersionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"stepExecutions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"stepId"}},{"kind":"Field","name":{"kind":"Name","value":"flowExecutionId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"attempt"}},{"kind":"Field","name":{"kind":"Name","value":"actionType"}},{"kind":"Field","name":{"kind":"Name","value":"input"}},{"kind":"Field","name":{"kind":"Name","value":"output"}},{"kind":"Field","name":{"kind":"Name","value":"elapsedTimeMs"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}},{"kind":"Field","name":{"kind":"Name","value":"elapsedTimeMs"}},{"kind":"Field","name":{"kind":"Name","value":"startedAt"}},{"kind":"Field","name":{"kind":"Name","value":"completedAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"errors"}}]}},{"kind":"Field","name":{"kind":"Name","value":"pagination"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"itemIndex"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemIndexForNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsPerPage"}},{"kind":"Field","name":{"kind":"Name","value":"itemsTotal"}},{"kind":"Field","name":{"kind":"Name","value":"page"}},{"kind":"Field","name":{"kind":"Name","value":"pagesTotal"}}]}}]}}]}}]} as unknown as DocumentNode<FlowExecutionHistoryQuery, FlowExecutionHistoryQueryVariables>;
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

  export const FlowExecutionStatus: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'FlowExecutionStatus',
    values: [
      'NotStarted',
      'Running',
      'Success',
      'Failed',
      'Canceled'
    ],
  }

  export const FlowExecutionHistoryInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'FlowExecutionHistoryInput',
    fields: [
      {
        name: 'triggerId',
        kind: 'scalar',
        type: 'String',
        required: false,
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
        name: 'flowId',
        kind: 'scalar',
        type: 'String',
        required: false,
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
        name: 'status',
        kind: 'enum',
        type: GraphQLInputTypes.FlowExecutionStatus,
        required: true,
        validation: [
          {
            type: 'isEnum',
            constraints: [
              {"NotStarted":"NotStarted","Running":"Running","Success":"Success","Failed":"Failed","Canceled":"Canceled"},
              ["NotStarted","Running","Success","Failed","Canceled"]
            ],
          }
        ],
      }
    ],
  }

  export const FlowExecutionInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'FlowExecutionInput',
    fields: [
      {
        name: 'executionId',
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

  export const OrderByDirection: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'OrderByDirection',
    values: [
      'Ascending',
      'Descending'
    ],
  }

  export const OrderByInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'OrderByInput',
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

  export const ColumnFilterInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'ColumnFilterInput',
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
      },
      {
        name: 'filters',
        kind: 'object',
        type: GraphQLInputTypes.ColumnFilterInput,
        required: true,
      },
      {
        name: 'orderBy',
        kind: 'object',
        type: GraphQLInputTypes.OrderByInput,
        required: true,
      }
    ],
  }

  export const NetworkToolHistoryInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'NetworkToolHistoryInput',
    fields: [
      {
        name: 'networkTool',
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

  export const GridRegionLevelsInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'GridRegionLevelsInput',
    fields: [
      {
        name: 'region',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'country',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'division',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'locality',
        kind: 'scalar',
        type: 'String',
        required: false,
      },
      {
        name: 'site',
        kind: 'scalar',
        type: 'String',
        required: false,
      }
    ],
  }

  export const NetworkToolPortCheckCreateInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'NetworkToolPortCheckCreateInput',
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
        name: 'port',
        kind: 'scalar',
        type: 'Float',
        required: true,
        validation: [
          {
            type: 'isInt',
          },
          {
            type: 'max',
            constraints: [
              65535
            ],
          },
          {
            type: 'min',
            constraints: [
              1
            ],
          }
        ],
      },
      {
        name: 'timeoutMs',
        kind: 'scalar',
        type: 'Float',
        required: false,
        validation: [
          {
            type: 'max',
            constraints: [
              60000
            ],
          },
          {
            type: 'min',
            constraints: [
              1000
            ],
          },
          {
            type: 'isInt',
          },
          {
            type: 'unknown',
            constraints: [
              null
            ],
          }
        ],
      },
      {
        name: 'region',
        kind: 'object',
        type: GraphQLInputTypes.GridRegionLevelsInput,
        required: true,
      }
    ],
  }

  export const GridRegionLevel: GraphQLInputEnumTypeMetadata = {
    kind: 'enum',
    type: 'GridRegionLevel',
    values: [
      'Region',
      'Country',
      'Division',
      'Locality',
      'Site'
    ],
  }

  export const GridRegionLevelsListInput: GraphQLInputObjectTypeMetadata = {
    kind: 'object',
    type: 'GridRegionLevelsListInput',
    fields: [
      {
        name: 'level',
        kind: 'enum',
        type: GraphQLInputTypes.GridRegionLevel,
        required: true,
        validation: [
          {
            type: 'isEnum',
            constraints: [
              {"Region":"region","Country":"country","Division":"division","Locality":"locality","Site":"site"},
              ["region","country","division","locality","site"]
            ],
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

export const GridRegionLevelsOperation: GraphQLOperationMetadata<typeof GridRegionLevelsDocument> = {
  operation: 'GridRegionLevels',
  operationType: 'query',
  document: GridRegionLevelsDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.GridRegionLevelsListInput,
    },
  ],
}
  
export const NetworkToolPortCheckCreateOperation: GraphQLOperationMetadata<typeof NetworkToolPortCheckCreateDocument> = {
  operation: 'NetworkToolPortCheckCreate',
  operationType: 'mutation',
  document: NetworkToolPortCheckCreateDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.NetworkToolPortCheckCreateInput,
    },
  ],
}
  
export const NetworkToolHistoryOperation: GraphQLOperationMetadata<typeof NetworkToolHistoryDocument> = {
  operation: 'NetworkToolHistory',
  operationType: 'query',
  document: NetworkToolHistoryDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.NetworkToolHistoryInput,
    },
    {
      parameter: 'pagination',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInput,
    },
  ],
}
  
export const FlowExecutionOperation: GraphQLOperationMetadata<typeof FlowExecutionDocument> = {
  operation: 'FlowExecution',
  operationType: 'query',
  document: FlowExecutionDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.FlowExecutionInput,
    },
  ],
}
  
export const FlowExecutionHistoryOperation: GraphQLOperationMetadata<typeof FlowExecutionHistoryDocument> = {
  operation: 'FlowExecutionHistory',
  operationType: 'query',
  document: FlowExecutionHistoryDocument,
  parameters: [
    {
      parameter: 'input',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.FlowExecutionHistoryInput,
    },
    {
      parameter: 'pagination',
      required: true,
      kind: 'object',
      type: GraphQLInputTypes.PaginationInput,
    },
  ],
}
  