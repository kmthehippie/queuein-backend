
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model OAuthToken
 * 
 */
export type OAuthToken = $Result.DefaultSelection<Prisma.$OAuthTokenPayload>
/**
 * Model Outlet
 * 
 */
export type Outlet = $Result.DefaultSelection<Prisma.$OutletPayload>
/**
 * Model Queue
 * 
 */
export type Queue = $Result.DefaultSelection<Prisma.$QueuePayload>
/**
 * Model Customer
 * 
 */
export type Customer = $Result.DefaultSelection<Prisma.$CustomerPayload>
/**
 * Model QueueItem
 * 
 */
export type QueueItem = $Result.DefaultSelection<Prisma.$QueueItemPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.oAuthToken`: Exposes CRUD operations for the **OAuthToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OAuthTokens
    * const oAuthTokens = await prisma.oAuthToken.findMany()
    * ```
    */
  get oAuthToken(): Prisma.OAuthTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.outlet`: Exposes CRUD operations for the **Outlet** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Outlets
    * const outlets = await prisma.outlet.findMany()
    * ```
    */
  get outlet(): Prisma.OutletDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.queue`: Exposes CRUD operations for the **Queue** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Queues
    * const queues = await prisma.queue.findMany()
    * ```
    */
  get queue(): Prisma.QueueDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.customer`: Exposes CRUD operations for the **Customer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Customers
    * const customers = await prisma.customer.findMany()
    * ```
    */
  get customer(): Prisma.CustomerDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.queueItem`: Exposes CRUD operations for the **QueueItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more QueueItems
    * const queueItems = await prisma.queueItem.findMany()
    * ```
    */
  get queueItem(): Prisma.QueueItemDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    OAuthToken: 'OAuthToken',
    Outlet: 'Outlet',
    Queue: 'Queue',
    Customer: 'Customer',
    QueueItem: 'QueueItem'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "oAuthToken" | "outlet" | "queue" | "customer" | "queueItem"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      OAuthToken: {
        payload: Prisma.$OAuthTokenPayload<ExtArgs>
        fields: Prisma.OAuthTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OAuthTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OAuthTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          findFirst: {
            args: Prisma.OAuthTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OAuthTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          findMany: {
            args: Prisma.OAuthTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          create: {
            args: Prisma.OAuthTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          createMany: {
            args: Prisma.OAuthTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OAuthTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          delete: {
            args: Prisma.OAuthTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          update: {
            args: Prisma.OAuthTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          deleteMany: {
            args: Prisma.OAuthTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OAuthTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OAuthTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>[]
          }
          upsert: {
            args: Prisma.OAuthTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OAuthTokenPayload>
          }
          aggregate: {
            args: Prisma.OAuthTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOAuthToken>
          }
          groupBy: {
            args: Prisma.OAuthTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<OAuthTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.OAuthTokenCountArgs<ExtArgs>
            result: $Utils.Optional<OAuthTokenCountAggregateOutputType> | number
          }
        }
      }
      Outlet: {
        payload: Prisma.$OutletPayload<ExtArgs>
        fields: Prisma.OutletFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OutletFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OutletFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          findFirst: {
            args: Prisma.OutletFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OutletFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          findMany: {
            args: Prisma.OutletFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>[]
          }
          create: {
            args: Prisma.OutletCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          createMany: {
            args: Prisma.OutletCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.OutletCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>[]
          }
          delete: {
            args: Prisma.OutletDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          update: {
            args: Prisma.OutletUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          deleteMany: {
            args: Prisma.OutletDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OutletUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.OutletUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>[]
          }
          upsert: {
            args: Prisma.OutletUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OutletPayload>
          }
          aggregate: {
            args: Prisma.OutletAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOutlet>
          }
          groupBy: {
            args: Prisma.OutletGroupByArgs<ExtArgs>
            result: $Utils.Optional<OutletGroupByOutputType>[]
          }
          count: {
            args: Prisma.OutletCountArgs<ExtArgs>
            result: $Utils.Optional<OutletCountAggregateOutputType> | number
          }
        }
      }
      Queue: {
        payload: Prisma.$QueuePayload<ExtArgs>
        fields: Prisma.QueueFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueueFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueueFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          findFirst: {
            args: Prisma.QueueFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueueFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          findMany: {
            args: Prisma.QueueFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>[]
          }
          create: {
            args: Prisma.QueueCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          createMany: {
            args: Prisma.QueueCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueueCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>[]
          }
          delete: {
            args: Prisma.QueueDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          update: {
            args: Prisma.QueueUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          deleteMany: {
            args: Prisma.QueueDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueueUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QueueUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>[]
          }
          upsert: {
            args: Prisma.QueueUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueuePayload>
          }
          aggregate: {
            args: Prisma.QueueAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueue>
          }
          groupBy: {
            args: Prisma.QueueGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueueGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueueCountArgs<ExtArgs>
            result: $Utils.Optional<QueueCountAggregateOutputType> | number
          }
        }
      }
      Customer: {
        payload: Prisma.$CustomerPayload<ExtArgs>
        fields: Prisma.CustomerFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CustomerFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CustomerFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findFirst: {
            args: Prisma.CustomerFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CustomerFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          findMany: {
            args: Prisma.CustomerFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          create: {
            args: Prisma.CustomerCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          createMany: {
            args: Prisma.CustomerCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CustomerCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          delete: {
            args: Prisma.CustomerDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          update: {
            args: Prisma.CustomerUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          deleteMany: {
            args: Prisma.CustomerDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CustomerUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CustomerUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>[]
          }
          upsert: {
            args: Prisma.CustomerUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CustomerPayload>
          }
          aggregate: {
            args: Prisma.CustomerAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCustomer>
          }
          groupBy: {
            args: Prisma.CustomerGroupByArgs<ExtArgs>
            result: $Utils.Optional<CustomerGroupByOutputType>[]
          }
          count: {
            args: Prisma.CustomerCountArgs<ExtArgs>
            result: $Utils.Optional<CustomerCountAggregateOutputType> | number
          }
        }
      }
      QueueItem: {
        payload: Prisma.$QueueItemPayload<ExtArgs>
        fields: Prisma.QueueItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QueueItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QueueItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload>
          }
          findFirst: {
            args: Prisma.QueueItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QueueItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload>
          }
          findMany: {
            args: Prisma.QueueItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload>[]
          }
          create: {
            args: Prisma.QueueItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload>
          }
          createMany: {
            args: Prisma.QueueItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.QueueItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload>[]
          }
          delete: {
            args: Prisma.QueueItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload>
          }
          update: {
            args: Prisma.QueueItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload>
          }
          deleteMany: {
            args: Prisma.QueueItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QueueItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.QueueItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload>[]
          }
          upsert: {
            args: Prisma.QueueItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QueueItemPayload>
          }
          aggregate: {
            args: Prisma.QueueItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQueueItem>
          }
          groupBy: {
            args: Prisma.QueueItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<QueueItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.QueueItemCountArgs<ExtArgs>
            result: $Utils.Optional<QueueItemCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    oAuthToken?: OAuthTokenOmit
    outlet?: OutletOmit
    queue?: QueueOmit
    customer?: CustomerOmit
    queueItem?: QueueItemOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    outlets: number
    OAuthToken: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outlets?: boolean | UserCountOutputTypeCountOutletsArgs
    OAuthToken?: boolean | UserCountOutputTypeCountOAuthTokenArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOutletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutletWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountOAuthTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
  }


  /**
   * Count Type OutletCountOutputType
   */

  export type OutletCountOutputType = {
    queues: number
  }

  export type OutletCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queues?: boolean | OutletCountOutputTypeCountQueuesArgs
  }

  // Custom InputTypes
  /**
   * OutletCountOutputType without action
   */
  export type OutletCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OutletCountOutputType
     */
    select?: OutletCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OutletCountOutputType without action
   */
  export type OutletCountOutputTypeCountQueuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueWhereInput
  }


  /**
   * Count Type QueueCountOutputType
   */

  export type QueueCountOutputType = {
    queueItems: number
  }

  export type QueueCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queueItems?: boolean | QueueCountOutputTypeCountQueueItemsArgs
  }

  // Custom InputTypes
  /**
   * QueueCountOutputType without action
   */
  export type QueueCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueCountOutputType
     */
    select?: QueueCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QueueCountOutputType without action
   */
  export type QueueCountOutputTypeCountQueueItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueItemWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    name: string | null
    email: string | null
    password: string | null
    hasPassword: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    createdAt: Date | null
    name: string | null
    email: string | null
    password: string | null
    hasPassword: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    createdAt: number
    name: number
    email: number
    password: number
    hasPassword: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    email?: true
    password?: true
    hasPassword?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    email?: true
    password?: true
    hasPassword?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    createdAt?: true
    name?: true
    email?: true
    password?: true
    hasPassword?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    createdAt: Date
    name: string | null
    email: string
    password: string | null
    hasPassword: boolean
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    hasPassword?: boolean
    outlets?: boolean | User$outletsArgs<ExtArgs>
    OAuthToken?: boolean | User$OAuthTokenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    hasPassword?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    hasPassword?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    createdAt?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    hasPassword?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "name" | "email" | "password" | "hasPassword", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outlets?: boolean | User$outletsArgs<ExtArgs>
    OAuthToken?: boolean | User$OAuthTokenArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      outlets: Prisma.$OutletPayload<ExtArgs>[]
      OAuthToken: Prisma.$OAuthTokenPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      createdAt: Date
      name: string | null
      email: string
      password: string | null
      hasPassword: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    outlets<T extends User$outletsArgs<ExtArgs> = {}>(args?: Subset<T, User$outletsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    OAuthToken<T extends User$OAuthTokenArgs<ExtArgs> = {}>(args?: Subset<T, User$OAuthTokenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly hasPassword: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.outlets
   */
  export type User$outletsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    where?: OutletWhereInput
    orderBy?: OutletOrderByWithRelationInput | OutletOrderByWithRelationInput[]
    cursor?: OutletWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OutletScalarFieldEnum | OutletScalarFieldEnum[]
  }

  /**
   * User.OAuthToken
   */
  export type User$OAuthTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    cursor?: OAuthTokenWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model OAuthToken
   */

  export type AggregateOAuthToken = {
    _count: OAuthTokenCountAggregateOutputType | null
    _avg: OAuthTokenAvgAggregateOutputType | null
    _sum: OAuthTokenSumAggregateOutputType | null
    _min: OAuthTokenMinAggregateOutputType | null
    _max: OAuthTokenMaxAggregateOutputType | null
  }

  export type OAuthTokenAvgAggregateOutputType = {
    id: number | null
  }

  export type OAuthTokenSumAggregateOutputType = {
    id: number | null
  }

  export type OAuthTokenMinAggregateOutputType = {
    id: number | null
    provider: string | null
    accessToken: string | null
    refreshToken: string | null
    userId: string | null
  }

  export type OAuthTokenMaxAggregateOutputType = {
    id: number | null
    provider: string | null
    accessToken: string | null
    refreshToken: string | null
    userId: string | null
  }

  export type OAuthTokenCountAggregateOutputType = {
    id: number
    provider: number
    accessToken: number
    refreshToken: number
    userId: number
    _all: number
  }


  export type OAuthTokenAvgAggregateInputType = {
    id?: true
  }

  export type OAuthTokenSumAggregateInputType = {
    id?: true
  }

  export type OAuthTokenMinAggregateInputType = {
    id?: true
    provider?: true
    accessToken?: true
    refreshToken?: true
    userId?: true
  }

  export type OAuthTokenMaxAggregateInputType = {
    id?: true
    provider?: true
    accessToken?: true
    refreshToken?: true
    userId?: true
  }

  export type OAuthTokenCountAggregateInputType = {
    id?: true
    provider?: true
    accessToken?: true
    refreshToken?: true
    userId?: true
    _all?: true
  }

  export type OAuthTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthToken to aggregate.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OAuthTokens
    **/
    _count?: true | OAuthTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OAuthTokenAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OAuthTokenSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OAuthTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OAuthTokenMaxAggregateInputType
  }

  export type GetOAuthTokenAggregateType<T extends OAuthTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateOAuthToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOAuthToken[P]>
      : GetScalarType<T[P], AggregateOAuthToken[P]>
  }




  export type OAuthTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OAuthTokenWhereInput
    orderBy?: OAuthTokenOrderByWithAggregationInput | OAuthTokenOrderByWithAggregationInput[]
    by: OAuthTokenScalarFieldEnum[] | OAuthTokenScalarFieldEnum
    having?: OAuthTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OAuthTokenCountAggregateInputType | true
    _avg?: OAuthTokenAvgAggregateInputType
    _sum?: OAuthTokenSumAggregateInputType
    _min?: OAuthTokenMinAggregateInputType
    _max?: OAuthTokenMaxAggregateInputType
  }

  export type OAuthTokenGroupByOutputType = {
    id: number
    provider: string
    accessToken: string
    refreshToken: string | null
    userId: string
    _count: OAuthTokenCountAggregateOutputType | null
    _avg: OAuthTokenAvgAggregateOutputType | null
    _sum: OAuthTokenSumAggregateOutputType | null
    _min: OAuthTokenMinAggregateOutputType | null
    _max: OAuthTokenMaxAggregateOutputType | null
  }

  type GetOAuthTokenGroupByPayload<T extends OAuthTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OAuthTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OAuthTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OAuthTokenGroupByOutputType[P]>
            : GetScalarType<T[P], OAuthTokenGroupByOutputType[P]>
        }
      >
    >


  export type OAuthTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    provider?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["oAuthToken"]>

  export type OAuthTokenSelectScalar = {
    id?: boolean
    provider?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    userId?: boolean
  }

  export type OAuthTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "provider" | "accessToken" | "refreshToken" | "userId", ExtArgs["result"]["oAuthToken"]>
  export type OAuthTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OAuthTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OAuthTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "OAuthToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      provider: string
      accessToken: string
      refreshToken: string | null
      userId: string
    }, ExtArgs["result"]["oAuthToken"]>
    composites: {}
  }

  type OAuthTokenGetPayload<S extends boolean | null | undefined | OAuthTokenDefaultArgs> = $Result.GetResult<Prisma.$OAuthTokenPayload, S>

  type OAuthTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OAuthTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OAuthTokenCountAggregateInputType | true
    }

  export interface OAuthTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['OAuthToken'], meta: { name: 'OAuthToken' } }
    /**
     * Find zero or one OAuthToken that matches the filter.
     * @param {OAuthTokenFindUniqueArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OAuthTokenFindUniqueArgs>(args: SelectSubset<T, OAuthTokenFindUniqueArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one OAuthToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OAuthTokenFindUniqueOrThrowArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OAuthTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, OAuthTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindFirstArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OAuthTokenFindFirstArgs>(args?: SelectSubset<T, OAuthTokenFindFirstArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first OAuthToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindFirstOrThrowArgs} args - Arguments to find a OAuthToken
     * @example
     * // Get one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OAuthTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, OAuthTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more OAuthTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OAuthTokens
     * const oAuthTokens = await prisma.oAuthToken.findMany()
     * 
     * // Get first 10 OAuthTokens
     * const oAuthTokens = await prisma.oAuthToken.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OAuthTokenFindManyArgs>(args?: SelectSubset<T, OAuthTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a OAuthToken.
     * @param {OAuthTokenCreateArgs} args - Arguments to create a OAuthToken.
     * @example
     * // Create one OAuthToken
     * const OAuthToken = await prisma.oAuthToken.create({
     *   data: {
     *     // ... data to create a OAuthToken
     *   }
     * })
     * 
     */
    create<T extends OAuthTokenCreateArgs>(args: SelectSubset<T, OAuthTokenCreateArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many OAuthTokens.
     * @param {OAuthTokenCreateManyArgs} args - Arguments to create many OAuthTokens.
     * @example
     * // Create many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OAuthTokenCreateManyArgs>(args?: SelectSubset<T, OAuthTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many OAuthTokens and returns the data saved in the database.
     * @param {OAuthTokenCreateManyAndReturnArgs} args - Arguments to create many OAuthTokens.
     * @example
     * // Create many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many OAuthTokens and only return the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OAuthTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, OAuthTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a OAuthToken.
     * @param {OAuthTokenDeleteArgs} args - Arguments to delete one OAuthToken.
     * @example
     * // Delete one OAuthToken
     * const OAuthToken = await prisma.oAuthToken.delete({
     *   where: {
     *     // ... filter to delete one OAuthToken
     *   }
     * })
     * 
     */
    delete<T extends OAuthTokenDeleteArgs>(args: SelectSubset<T, OAuthTokenDeleteArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one OAuthToken.
     * @param {OAuthTokenUpdateArgs} args - Arguments to update one OAuthToken.
     * @example
     * // Update one OAuthToken
     * const oAuthToken = await prisma.oAuthToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OAuthTokenUpdateArgs>(args: SelectSubset<T, OAuthTokenUpdateArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more OAuthTokens.
     * @param {OAuthTokenDeleteManyArgs} args - Arguments to filter OAuthTokens to delete.
     * @example
     * // Delete a few OAuthTokens
     * const { count } = await prisma.oAuthToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OAuthTokenDeleteManyArgs>(args?: SelectSubset<T, OAuthTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OAuthTokenUpdateManyArgs>(args: SelectSubset<T, OAuthTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more OAuthTokens and returns the data updated in the database.
     * @param {OAuthTokenUpdateManyAndReturnArgs} args - Arguments to update many OAuthTokens.
     * @example
     * // Update many OAuthTokens
     * const oAuthToken = await prisma.oAuthToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more OAuthTokens and only return the `id`
     * const oAuthTokenWithIdOnly = await prisma.oAuthToken.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OAuthTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, OAuthTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one OAuthToken.
     * @param {OAuthTokenUpsertArgs} args - Arguments to update or create a OAuthToken.
     * @example
     * // Update or create a OAuthToken
     * const oAuthToken = await prisma.oAuthToken.upsert({
     *   create: {
     *     // ... data to create a OAuthToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OAuthToken we want to update
     *   }
     * })
     */
    upsert<T extends OAuthTokenUpsertArgs>(args: SelectSubset<T, OAuthTokenUpsertArgs<ExtArgs>>): Prisma__OAuthTokenClient<$Result.GetResult<Prisma.$OAuthTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of OAuthTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenCountArgs} args - Arguments to filter OAuthTokens to count.
     * @example
     * // Count the number of OAuthTokens
     * const count = await prisma.oAuthToken.count({
     *   where: {
     *     // ... the filter for the OAuthTokens we want to count
     *   }
     * })
    **/
    count<T extends OAuthTokenCountArgs>(
      args?: Subset<T, OAuthTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OAuthTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OAuthToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OAuthTokenAggregateArgs>(args: Subset<T, OAuthTokenAggregateArgs>): Prisma.PrismaPromise<GetOAuthTokenAggregateType<T>>

    /**
     * Group by OAuthToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OAuthTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OAuthTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OAuthTokenGroupByArgs['orderBy'] }
        : { orderBy?: OAuthTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OAuthTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOAuthTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the OAuthToken model
   */
  readonly fields: OAuthTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for OAuthToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OAuthTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the OAuthToken model
   */
  interface OAuthTokenFieldRefs {
    readonly id: FieldRef<"OAuthToken", 'Int'>
    readonly provider: FieldRef<"OAuthToken", 'String'>
    readonly accessToken: FieldRef<"OAuthToken", 'String'>
    readonly refreshToken: FieldRef<"OAuthToken", 'String'>
    readonly userId: FieldRef<"OAuthToken", 'String'>
  }
    

  // Custom InputTypes
  /**
   * OAuthToken findUnique
   */
  export type OAuthTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken findUniqueOrThrow
   */
  export type OAuthTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken findFirst
   */
  export type OAuthTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken findFirstOrThrow
   */
  export type OAuthTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthToken to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OAuthTokens.
     */
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken findMany
   */
  export type OAuthTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter, which OAuthTokens to fetch.
     */
    where?: OAuthTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OAuthTokens to fetch.
     */
    orderBy?: OAuthTokenOrderByWithRelationInput | OAuthTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OAuthTokens.
     */
    cursor?: OAuthTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OAuthTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OAuthTokens.
     */
    skip?: number
    distinct?: OAuthTokenScalarFieldEnum | OAuthTokenScalarFieldEnum[]
  }

  /**
   * OAuthToken create
   */
  export type OAuthTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a OAuthToken.
     */
    data: XOR<OAuthTokenCreateInput, OAuthTokenUncheckedCreateInput>
  }

  /**
   * OAuthToken createMany
   */
  export type OAuthTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many OAuthTokens.
     */
    data: OAuthTokenCreateManyInput | OAuthTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * OAuthToken createManyAndReturn
   */
  export type OAuthTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * The data used to create many OAuthTokens.
     */
    data: OAuthTokenCreateManyInput | OAuthTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthToken update
   */
  export type OAuthTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a OAuthToken.
     */
    data: XOR<OAuthTokenUpdateInput, OAuthTokenUncheckedUpdateInput>
    /**
     * Choose, which OAuthToken to update.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken updateMany
   */
  export type OAuthTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update OAuthTokens.
     */
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthTokens to update
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to update.
     */
    limit?: number
  }

  /**
   * OAuthToken updateManyAndReturn
   */
  export type OAuthTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * The data used to update OAuthTokens.
     */
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyInput>
    /**
     * Filter which OAuthTokens to update
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * OAuthToken upsert
   */
  export type OAuthTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the OAuthToken to update in case it exists.
     */
    where: OAuthTokenWhereUniqueInput
    /**
     * In case the OAuthToken found by the `where` argument doesn't exist, create a new OAuthToken with this data.
     */
    create: XOR<OAuthTokenCreateInput, OAuthTokenUncheckedCreateInput>
    /**
     * In case the OAuthToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OAuthTokenUpdateInput, OAuthTokenUncheckedUpdateInput>
  }

  /**
   * OAuthToken delete
   */
  export type OAuthTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
    /**
     * Filter which OAuthToken to delete.
     */
    where: OAuthTokenWhereUniqueInput
  }

  /**
   * OAuthToken deleteMany
   */
  export type OAuthTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which OAuthTokens to delete
     */
    where?: OAuthTokenWhereInput
    /**
     * Limit how many OAuthTokens to delete.
     */
    limit?: number
  }

  /**
   * OAuthToken without action
   */
  export type OAuthTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OAuthToken
     */
    select?: OAuthTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the OAuthToken
     */
    omit?: OAuthTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OAuthTokenInclude<ExtArgs> | null
  }


  /**
   * Model Outlet
   */

  export type AggregateOutlet = {
    _count: OutletCountAggregateOutputType | null
    _avg: OutletAvgAggregateOutputType | null
    _sum: OutletSumAggregateOutputType | null
    _min: OutletMinAggregateOutputType | null
    _max: OutletMaxAggregateOutputType | null
  }

  export type OutletAvgAggregateOutputType = {
    id: number | null
  }

  export type OutletSumAggregateOutputType = {
    id: number | null
  }

  export type OutletMinAggregateOutputType = {
    id: number | null
    name: string | null
    userId: string | null
  }

  export type OutletMaxAggregateOutputType = {
    id: number | null
    name: string | null
    userId: string | null
  }

  export type OutletCountAggregateOutputType = {
    id: number
    name: number
    userId: number
    _all: number
  }


  export type OutletAvgAggregateInputType = {
    id?: true
  }

  export type OutletSumAggregateInputType = {
    id?: true
  }

  export type OutletMinAggregateInputType = {
    id?: true
    name?: true
    userId?: true
  }

  export type OutletMaxAggregateInputType = {
    id?: true
    name?: true
    userId?: true
  }

  export type OutletCountAggregateInputType = {
    id?: true
    name?: true
    userId?: true
    _all?: true
  }

  export type OutletAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outlet to aggregate.
     */
    where?: OutletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outlets to fetch.
     */
    orderBy?: OutletOrderByWithRelationInput | OutletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OutletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outlets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outlets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Outlets
    **/
    _count?: true | OutletCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OutletAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OutletSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OutletMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OutletMaxAggregateInputType
  }

  export type GetOutletAggregateType<T extends OutletAggregateArgs> = {
        [P in keyof T & keyof AggregateOutlet]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOutlet[P]>
      : GetScalarType<T[P], AggregateOutlet[P]>
  }




  export type OutletGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OutletWhereInput
    orderBy?: OutletOrderByWithAggregationInput | OutletOrderByWithAggregationInput[]
    by: OutletScalarFieldEnum[] | OutletScalarFieldEnum
    having?: OutletScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OutletCountAggregateInputType | true
    _avg?: OutletAvgAggregateInputType
    _sum?: OutletSumAggregateInputType
    _min?: OutletMinAggregateInputType
    _max?: OutletMaxAggregateInputType
  }

  export type OutletGroupByOutputType = {
    id: number
    name: string | null
    userId: string
    _count: OutletCountAggregateOutputType | null
    _avg: OutletAvgAggregateOutputType | null
    _sum: OutletSumAggregateOutputType | null
    _min: OutletMinAggregateOutputType | null
    _max: OutletMaxAggregateOutputType | null
  }

  type GetOutletGroupByPayload<T extends OutletGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OutletGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OutletGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OutletGroupByOutputType[P]>
            : GetScalarType<T[P], OutletGroupByOutputType[P]>
        }
      >
    >


  export type OutletSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    queues?: boolean | Outlet$queuesArgs<ExtArgs>
    _count?: boolean | OutletCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outlet"]>

  export type OutletSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outlet"]>

  export type OutletSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    userId?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["outlet"]>

  export type OutletSelectScalar = {
    id?: boolean
    name?: boolean
    userId?: boolean
  }

  export type OutletOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "userId", ExtArgs["result"]["outlet"]>
  export type OutletInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    queues?: boolean | Outlet$queuesArgs<ExtArgs>
    _count?: boolean | OutletCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type OutletIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type OutletIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $OutletPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Outlet"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      queues: Prisma.$QueuePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string | null
      userId: string
    }, ExtArgs["result"]["outlet"]>
    composites: {}
  }

  type OutletGetPayload<S extends boolean | null | undefined | OutletDefaultArgs> = $Result.GetResult<Prisma.$OutletPayload, S>

  type OutletCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OutletFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OutletCountAggregateInputType | true
    }

  export interface OutletDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Outlet'], meta: { name: 'Outlet' } }
    /**
     * Find zero or one Outlet that matches the filter.
     * @param {OutletFindUniqueArgs} args - Arguments to find a Outlet
     * @example
     * // Get one Outlet
     * const outlet = await prisma.outlet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OutletFindUniqueArgs>(args: SelectSubset<T, OutletFindUniqueArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Outlet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OutletFindUniqueOrThrowArgs} args - Arguments to find a Outlet
     * @example
     * // Get one Outlet
     * const outlet = await prisma.outlet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OutletFindUniqueOrThrowArgs>(args: SelectSubset<T, OutletFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outlet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletFindFirstArgs} args - Arguments to find a Outlet
     * @example
     * // Get one Outlet
     * const outlet = await prisma.outlet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OutletFindFirstArgs>(args?: SelectSubset<T, OutletFindFirstArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Outlet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletFindFirstOrThrowArgs} args - Arguments to find a Outlet
     * @example
     * // Get one Outlet
     * const outlet = await prisma.outlet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OutletFindFirstOrThrowArgs>(args?: SelectSubset<T, OutletFindFirstOrThrowArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Outlets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Outlets
     * const outlets = await prisma.outlet.findMany()
     * 
     * // Get first 10 Outlets
     * const outlets = await prisma.outlet.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const outletWithIdOnly = await prisma.outlet.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OutletFindManyArgs>(args?: SelectSubset<T, OutletFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Outlet.
     * @param {OutletCreateArgs} args - Arguments to create a Outlet.
     * @example
     * // Create one Outlet
     * const Outlet = await prisma.outlet.create({
     *   data: {
     *     // ... data to create a Outlet
     *   }
     * })
     * 
     */
    create<T extends OutletCreateArgs>(args: SelectSubset<T, OutletCreateArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Outlets.
     * @param {OutletCreateManyArgs} args - Arguments to create many Outlets.
     * @example
     * // Create many Outlets
     * const outlet = await prisma.outlet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OutletCreateManyArgs>(args?: SelectSubset<T, OutletCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Outlets and returns the data saved in the database.
     * @param {OutletCreateManyAndReturnArgs} args - Arguments to create many Outlets.
     * @example
     * // Create many Outlets
     * const outlet = await prisma.outlet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Outlets and only return the `id`
     * const outletWithIdOnly = await prisma.outlet.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends OutletCreateManyAndReturnArgs>(args?: SelectSubset<T, OutletCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Outlet.
     * @param {OutletDeleteArgs} args - Arguments to delete one Outlet.
     * @example
     * // Delete one Outlet
     * const Outlet = await prisma.outlet.delete({
     *   where: {
     *     // ... filter to delete one Outlet
     *   }
     * })
     * 
     */
    delete<T extends OutletDeleteArgs>(args: SelectSubset<T, OutletDeleteArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Outlet.
     * @param {OutletUpdateArgs} args - Arguments to update one Outlet.
     * @example
     * // Update one Outlet
     * const outlet = await prisma.outlet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OutletUpdateArgs>(args: SelectSubset<T, OutletUpdateArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Outlets.
     * @param {OutletDeleteManyArgs} args - Arguments to filter Outlets to delete.
     * @example
     * // Delete a few Outlets
     * const { count } = await prisma.outlet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OutletDeleteManyArgs>(args?: SelectSubset<T, OutletDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outlets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Outlets
     * const outlet = await prisma.outlet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OutletUpdateManyArgs>(args: SelectSubset<T, OutletUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Outlets and returns the data updated in the database.
     * @param {OutletUpdateManyAndReturnArgs} args - Arguments to update many Outlets.
     * @example
     * // Update many Outlets
     * const outlet = await prisma.outlet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Outlets and only return the `id`
     * const outletWithIdOnly = await prisma.outlet.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends OutletUpdateManyAndReturnArgs>(args: SelectSubset<T, OutletUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Outlet.
     * @param {OutletUpsertArgs} args - Arguments to update or create a Outlet.
     * @example
     * // Update or create a Outlet
     * const outlet = await prisma.outlet.upsert({
     *   create: {
     *     // ... data to create a Outlet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Outlet we want to update
     *   }
     * })
     */
    upsert<T extends OutletUpsertArgs>(args: SelectSubset<T, OutletUpsertArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Outlets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletCountArgs} args - Arguments to filter Outlets to count.
     * @example
     * // Count the number of Outlets
     * const count = await prisma.outlet.count({
     *   where: {
     *     // ... the filter for the Outlets we want to count
     *   }
     * })
    **/
    count<T extends OutletCountArgs>(
      args?: Subset<T, OutletCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OutletCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Outlet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OutletAggregateArgs>(args: Subset<T, OutletAggregateArgs>): Prisma.PrismaPromise<GetOutletAggregateType<T>>

    /**
     * Group by Outlet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OutletGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OutletGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OutletGroupByArgs['orderBy'] }
        : { orderBy?: OutletGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OutletGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOutletGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Outlet model
   */
  readonly fields: OutletFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Outlet.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OutletClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    queues<T extends Outlet$queuesArgs<ExtArgs> = {}>(args?: Subset<T, Outlet$queuesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Outlet model
   */
  interface OutletFieldRefs {
    readonly id: FieldRef<"Outlet", 'Int'>
    readonly name: FieldRef<"Outlet", 'String'>
    readonly userId: FieldRef<"Outlet", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Outlet findUnique
   */
  export type OutletFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter, which Outlet to fetch.
     */
    where: OutletWhereUniqueInput
  }

  /**
   * Outlet findUniqueOrThrow
   */
  export type OutletFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter, which Outlet to fetch.
     */
    where: OutletWhereUniqueInput
  }

  /**
   * Outlet findFirst
   */
  export type OutletFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter, which Outlet to fetch.
     */
    where?: OutletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outlets to fetch.
     */
    orderBy?: OutletOrderByWithRelationInput | OutletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outlets.
     */
    cursor?: OutletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outlets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outlets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outlets.
     */
    distinct?: OutletScalarFieldEnum | OutletScalarFieldEnum[]
  }

  /**
   * Outlet findFirstOrThrow
   */
  export type OutletFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter, which Outlet to fetch.
     */
    where?: OutletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outlets to fetch.
     */
    orderBy?: OutletOrderByWithRelationInput | OutletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Outlets.
     */
    cursor?: OutletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outlets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outlets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Outlets.
     */
    distinct?: OutletScalarFieldEnum | OutletScalarFieldEnum[]
  }

  /**
   * Outlet findMany
   */
  export type OutletFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter, which Outlets to fetch.
     */
    where?: OutletWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Outlets to fetch.
     */
    orderBy?: OutletOrderByWithRelationInput | OutletOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Outlets.
     */
    cursor?: OutletWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Outlets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Outlets.
     */
    skip?: number
    distinct?: OutletScalarFieldEnum | OutletScalarFieldEnum[]
  }

  /**
   * Outlet create
   */
  export type OutletCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * The data needed to create a Outlet.
     */
    data: XOR<OutletCreateInput, OutletUncheckedCreateInput>
  }

  /**
   * Outlet createMany
   */
  export type OutletCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Outlets.
     */
    data: OutletCreateManyInput | OutletCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Outlet createManyAndReturn
   */
  export type OutletCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * The data used to create many Outlets.
     */
    data: OutletCreateManyInput | OutletCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Outlet update
   */
  export type OutletUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * The data needed to update a Outlet.
     */
    data: XOR<OutletUpdateInput, OutletUncheckedUpdateInput>
    /**
     * Choose, which Outlet to update.
     */
    where: OutletWhereUniqueInput
  }

  /**
   * Outlet updateMany
   */
  export type OutletUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Outlets.
     */
    data: XOR<OutletUpdateManyMutationInput, OutletUncheckedUpdateManyInput>
    /**
     * Filter which Outlets to update
     */
    where?: OutletWhereInput
    /**
     * Limit how many Outlets to update.
     */
    limit?: number
  }

  /**
   * Outlet updateManyAndReturn
   */
  export type OutletUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * The data used to update Outlets.
     */
    data: XOR<OutletUpdateManyMutationInput, OutletUncheckedUpdateManyInput>
    /**
     * Filter which Outlets to update
     */
    where?: OutletWhereInput
    /**
     * Limit how many Outlets to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Outlet upsert
   */
  export type OutletUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * The filter to search for the Outlet to update in case it exists.
     */
    where: OutletWhereUniqueInput
    /**
     * In case the Outlet found by the `where` argument doesn't exist, create a new Outlet with this data.
     */
    create: XOR<OutletCreateInput, OutletUncheckedCreateInput>
    /**
     * In case the Outlet was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OutletUpdateInput, OutletUncheckedUpdateInput>
  }

  /**
   * Outlet delete
   */
  export type OutletDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
    /**
     * Filter which Outlet to delete.
     */
    where: OutletWhereUniqueInput
  }

  /**
   * Outlet deleteMany
   */
  export type OutletDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Outlets to delete
     */
    where?: OutletWhereInput
    /**
     * Limit how many Outlets to delete.
     */
    limit?: number
  }

  /**
   * Outlet.queues
   */
  export type Outlet$queuesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    where?: QueueWhereInput
    orderBy?: QueueOrderByWithRelationInput | QueueOrderByWithRelationInput[]
    cursor?: QueueWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QueueScalarFieldEnum | QueueScalarFieldEnum[]
  }

  /**
   * Outlet without action
   */
  export type OutletDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Outlet
     */
    select?: OutletSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Outlet
     */
    omit?: OutletOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OutletInclude<ExtArgs> | null
  }


  /**
   * Model Queue
   */

  export type AggregateQueue = {
    _count: QueueCountAggregateOutputType | null
    _avg: QueueAvgAggregateOutputType | null
    _sum: QueueSumAggregateOutputType | null
    _min: QueueMinAggregateOutputType | null
    _max: QueueMaxAggregateOutputType | null
  }

  export type QueueAvgAggregateOutputType = {
    id: number | null
    outletId: number | null
  }

  export type QueueSumAggregateOutputType = {
    id: number | null
    outletId: number | null
  }

  export type QueueMinAggregateOutputType = {
    id: number | null
    outletId: number | null
    startTime: Date | null
    endTime: Date | null
    active: boolean | null
    name: string | null
  }

  export type QueueMaxAggregateOutputType = {
    id: number | null
    outletId: number | null
    startTime: Date | null
    endTime: Date | null
    active: boolean | null
    name: string | null
  }

  export type QueueCountAggregateOutputType = {
    id: number
    outletId: number
    startTime: number
    endTime: number
    active: number
    name: number
    _all: number
  }


  export type QueueAvgAggregateInputType = {
    id?: true
    outletId?: true
  }

  export type QueueSumAggregateInputType = {
    id?: true
    outletId?: true
  }

  export type QueueMinAggregateInputType = {
    id?: true
    outletId?: true
    startTime?: true
    endTime?: true
    active?: true
    name?: true
  }

  export type QueueMaxAggregateInputType = {
    id?: true
    outletId?: true
    startTime?: true
    endTime?: true
    active?: true
    name?: true
  }

  export type QueueCountAggregateInputType = {
    id?: true
    outletId?: true
    startTime?: true
    endTime?: true
    active?: true
    name?: true
    _all?: true
  }

  export type QueueAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Queue to aggregate.
     */
    where?: QueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Queues to fetch.
     */
    orderBy?: QueueOrderByWithRelationInput | QueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Queues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Queues
    **/
    _count?: true | QueueCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QueueAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QueueSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueueMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueueMaxAggregateInputType
  }

  export type GetQueueAggregateType<T extends QueueAggregateArgs> = {
        [P in keyof T & keyof AggregateQueue]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueue[P]>
      : GetScalarType<T[P], AggregateQueue[P]>
  }




  export type QueueGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueWhereInput
    orderBy?: QueueOrderByWithAggregationInput | QueueOrderByWithAggregationInput[]
    by: QueueScalarFieldEnum[] | QueueScalarFieldEnum
    having?: QueueScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueueCountAggregateInputType | true
    _avg?: QueueAvgAggregateInputType
    _sum?: QueueSumAggregateInputType
    _min?: QueueMinAggregateInputType
    _max?: QueueMaxAggregateInputType
  }

  export type QueueGroupByOutputType = {
    id: number
    outletId: number
    startTime: Date
    endTime: Date | null
    active: boolean
    name: string | null
    _count: QueueCountAggregateOutputType | null
    _avg: QueueAvgAggregateOutputType | null
    _sum: QueueSumAggregateOutputType | null
    _min: QueueMinAggregateOutputType | null
    _max: QueueMaxAggregateOutputType | null
  }

  type GetQueueGroupByPayload<T extends QueueGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueueGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueueGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueueGroupByOutputType[P]>
            : GetScalarType<T[P], QueueGroupByOutputType[P]>
        }
      >
    >


  export type QueueSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outletId?: boolean
    startTime?: boolean
    endTime?: boolean
    active?: boolean
    name?: boolean
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
    queueItems?: boolean | Queue$queueItemsArgs<ExtArgs>
    _count?: boolean | QueueCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queue"]>

  export type QueueSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outletId?: boolean
    startTime?: boolean
    endTime?: boolean
    active?: boolean
    name?: boolean
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queue"]>

  export type QueueSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    outletId?: boolean
    startTime?: boolean
    endTime?: boolean
    active?: boolean
    name?: boolean
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["queue"]>

  export type QueueSelectScalar = {
    id?: boolean
    outletId?: boolean
    startTime?: boolean
    endTime?: boolean
    active?: boolean
    name?: boolean
  }

  export type QueueOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "outletId" | "startTime" | "endTime" | "active" | "name", ExtArgs["result"]["queue"]>
  export type QueueInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
    queueItems?: boolean | Queue$queueItemsArgs<ExtArgs>
    _count?: boolean | QueueCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type QueueIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }
  export type QueueIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    outlet?: boolean | OutletDefaultArgs<ExtArgs>
  }

  export type $QueuePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Queue"
    objects: {
      outlet: Prisma.$OutletPayload<ExtArgs>
      queueItems: Prisma.$QueueItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      outletId: number
      startTime: Date
      endTime: Date | null
      active: boolean
      name: string | null
    }, ExtArgs["result"]["queue"]>
    composites: {}
  }

  type QueueGetPayload<S extends boolean | null | undefined | QueueDefaultArgs> = $Result.GetResult<Prisma.$QueuePayload, S>

  type QueueCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QueueFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QueueCountAggregateInputType | true
    }

  export interface QueueDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Queue'], meta: { name: 'Queue' } }
    /**
     * Find zero or one Queue that matches the filter.
     * @param {QueueFindUniqueArgs} args - Arguments to find a Queue
     * @example
     * // Get one Queue
     * const queue = await prisma.queue.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueueFindUniqueArgs>(args: SelectSubset<T, QueueFindUniqueArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Queue that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QueueFindUniqueOrThrowArgs} args - Arguments to find a Queue
     * @example
     * // Get one Queue
     * const queue = await prisma.queue.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueueFindUniqueOrThrowArgs>(args: SelectSubset<T, QueueFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Queue that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueFindFirstArgs} args - Arguments to find a Queue
     * @example
     * // Get one Queue
     * const queue = await prisma.queue.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueueFindFirstArgs>(args?: SelectSubset<T, QueueFindFirstArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Queue that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueFindFirstOrThrowArgs} args - Arguments to find a Queue
     * @example
     * // Get one Queue
     * const queue = await prisma.queue.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueueFindFirstOrThrowArgs>(args?: SelectSubset<T, QueueFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Queues that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Queues
     * const queues = await prisma.queue.findMany()
     * 
     * // Get first 10 Queues
     * const queues = await prisma.queue.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queueWithIdOnly = await prisma.queue.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueueFindManyArgs>(args?: SelectSubset<T, QueueFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Queue.
     * @param {QueueCreateArgs} args - Arguments to create a Queue.
     * @example
     * // Create one Queue
     * const Queue = await prisma.queue.create({
     *   data: {
     *     // ... data to create a Queue
     *   }
     * })
     * 
     */
    create<T extends QueueCreateArgs>(args: SelectSubset<T, QueueCreateArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Queues.
     * @param {QueueCreateManyArgs} args - Arguments to create many Queues.
     * @example
     * // Create many Queues
     * const queue = await prisma.queue.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueueCreateManyArgs>(args?: SelectSubset<T, QueueCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Queues and returns the data saved in the database.
     * @param {QueueCreateManyAndReturnArgs} args - Arguments to create many Queues.
     * @example
     * // Create many Queues
     * const queue = await prisma.queue.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Queues and only return the `id`
     * const queueWithIdOnly = await prisma.queue.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueueCreateManyAndReturnArgs>(args?: SelectSubset<T, QueueCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Queue.
     * @param {QueueDeleteArgs} args - Arguments to delete one Queue.
     * @example
     * // Delete one Queue
     * const Queue = await prisma.queue.delete({
     *   where: {
     *     // ... filter to delete one Queue
     *   }
     * })
     * 
     */
    delete<T extends QueueDeleteArgs>(args: SelectSubset<T, QueueDeleteArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Queue.
     * @param {QueueUpdateArgs} args - Arguments to update one Queue.
     * @example
     * // Update one Queue
     * const queue = await prisma.queue.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueueUpdateArgs>(args: SelectSubset<T, QueueUpdateArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Queues.
     * @param {QueueDeleteManyArgs} args - Arguments to filter Queues to delete.
     * @example
     * // Delete a few Queues
     * const { count } = await prisma.queue.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueueDeleteManyArgs>(args?: SelectSubset<T, QueueDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Queues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Queues
     * const queue = await prisma.queue.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueueUpdateManyArgs>(args: SelectSubset<T, QueueUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Queues and returns the data updated in the database.
     * @param {QueueUpdateManyAndReturnArgs} args - Arguments to update many Queues.
     * @example
     * // Update many Queues
     * const queue = await prisma.queue.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Queues and only return the `id`
     * const queueWithIdOnly = await prisma.queue.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QueueUpdateManyAndReturnArgs>(args: SelectSubset<T, QueueUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Queue.
     * @param {QueueUpsertArgs} args - Arguments to update or create a Queue.
     * @example
     * // Update or create a Queue
     * const queue = await prisma.queue.upsert({
     *   create: {
     *     // ... data to create a Queue
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Queue we want to update
     *   }
     * })
     */
    upsert<T extends QueueUpsertArgs>(args: SelectSubset<T, QueueUpsertArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Queues.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueCountArgs} args - Arguments to filter Queues to count.
     * @example
     * // Count the number of Queues
     * const count = await prisma.queue.count({
     *   where: {
     *     // ... the filter for the Queues we want to count
     *   }
     * })
    **/
    count<T extends QueueCountArgs>(
      args?: Subset<T, QueueCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueueCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Queue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueueAggregateArgs>(args: Subset<T, QueueAggregateArgs>): Prisma.PrismaPromise<GetQueueAggregateType<T>>

    /**
     * Group by Queue.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueueGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueueGroupByArgs['orderBy'] }
        : { orderBy?: QueueGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueueGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Queue model
   */
  readonly fields: QueueFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Queue.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueueClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    outlet<T extends OutletDefaultArgs<ExtArgs> = {}>(args?: Subset<T, OutletDefaultArgs<ExtArgs>>): Prisma__OutletClient<$Result.GetResult<Prisma.$OutletPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    queueItems<T extends Queue$queueItemsArgs<ExtArgs> = {}>(args?: Subset<T, Queue$queueItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Queue model
   */
  interface QueueFieldRefs {
    readonly id: FieldRef<"Queue", 'Int'>
    readonly outletId: FieldRef<"Queue", 'Int'>
    readonly startTime: FieldRef<"Queue", 'DateTime'>
    readonly endTime: FieldRef<"Queue", 'DateTime'>
    readonly active: FieldRef<"Queue", 'Boolean'>
    readonly name: FieldRef<"Queue", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Queue findUnique
   */
  export type QueueFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter, which Queue to fetch.
     */
    where: QueueWhereUniqueInput
  }

  /**
   * Queue findUniqueOrThrow
   */
  export type QueueFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter, which Queue to fetch.
     */
    where: QueueWhereUniqueInput
  }

  /**
   * Queue findFirst
   */
  export type QueueFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter, which Queue to fetch.
     */
    where?: QueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Queues to fetch.
     */
    orderBy?: QueueOrderByWithRelationInput | QueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Queues.
     */
    cursor?: QueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Queues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Queues.
     */
    distinct?: QueueScalarFieldEnum | QueueScalarFieldEnum[]
  }

  /**
   * Queue findFirstOrThrow
   */
  export type QueueFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter, which Queue to fetch.
     */
    where?: QueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Queues to fetch.
     */
    orderBy?: QueueOrderByWithRelationInput | QueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Queues.
     */
    cursor?: QueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Queues.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Queues.
     */
    distinct?: QueueScalarFieldEnum | QueueScalarFieldEnum[]
  }

  /**
   * Queue findMany
   */
  export type QueueFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter, which Queues to fetch.
     */
    where?: QueueWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Queues to fetch.
     */
    orderBy?: QueueOrderByWithRelationInput | QueueOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Queues.
     */
    cursor?: QueueWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Queues from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Queues.
     */
    skip?: number
    distinct?: QueueScalarFieldEnum | QueueScalarFieldEnum[]
  }

  /**
   * Queue create
   */
  export type QueueCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * The data needed to create a Queue.
     */
    data: XOR<QueueCreateInput, QueueUncheckedCreateInput>
  }

  /**
   * Queue createMany
   */
  export type QueueCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Queues.
     */
    data: QueueCreateManyInput | QueueCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Queue createManyAndReturn
   */
  export type QueueCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * The data used to create many Queues.
     */
    data: QueueCreateManyInput | QueueCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Queue update
   */
  export type QueueUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * The data needed to update a Queue.
     */
    data: XOR<QueueUpdateInput, QueueUncheckedUpdateInput>
    /**
     * Choose, which Queue to update.
     */
    where: QueueWhereUniqueInput
  }

  /**
   * Queue updateMany
   */
  export type QueueUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Queues.
     */
    data: XOR<QueueUpdateManyMutationInput, QueueUncheckedUpdateManyInput>
    /**
     * Filter which Queues to update
     */
    where?: QueueWhereInput
    /**
     * Limit how many Queues to update.
     */
    limit?: number
  }

  /**
   * Queue updateManyAndReturn
   */
  export type QueueUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * The data used to update Queues.
     */
    data: XOR<QueueUpdateManyMutationInput, QueueUncheckedUpdateManyInput>
    /**
     * Filter which Queues to update
     */
    where?: QueueWhereInput
    /**
     * Limit how many Queues to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Queue upsert
   */
  export type QueueUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * The filter to search for the Queue to update in case it exists.
     */
    where: QueueWhereUniqueInput
    /**
     * In case the Queue found by the `where` argument doesn't exist, create a new Queue with this data.
     */
    create: XOR<QueueCreateInput, QueueUncheckedCreateInput>
    /**
     * In case the Queue was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueueUpdateInput, QueueUncheckedUpdateInput>
  }

  /**
   * Queue delete
   */
  export type QueueDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
    /**
     * Filter which Queue to delete.
     */
    where: QueueWhereUniqueInput
  }

  /**
   * Queue deleteMany
   */
  export type QueueDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Queues to delete
     */
    where?: QueueWhereInput
    /**
     * Limit how many Queues to delete.
     */
    limit?: number
  }

  /**
   * Queue.queueItems
   */
  export type Queue$queueItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    where?: QueueItemWhereInput
    orderBy?: QueueItemOrderByWithRelationInput | QueueItemOrderByWithRelationInput[]
    cursor?: QueueItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QueueItemScalarFieldEnum | QueueItemScalarFieldEnum[]
  }

  /**
   * Queue without action
   */
  export type QueueDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Queue
     */
    select?: QueueSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Queue
     */
    omit?: QueueOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueInclude<ExtArgs> | null
  }


  /**
   * Model Customer
   */

  export type AggregateCustomer = {
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  export type CustomerMinAggregateOutputType = {
    id: string | null
    name: string | null
    number: string | null
    VIP: boolean | null
  }

  export type CustomerMaxAggregateOutputType = {
    id: string | null
    name: string | null
    number: string | null
    VIP: boolean | null
  }

  export type CustomerCountAggregateOutputType = {
    id: number
    name: number
    number: number
    VIP: number
    _all: number
  }


  export type CustomerMinAggregateInputType = {
    id?: true
    name?: true
    number?: true
    VIP?: true
  }

  export type CustomerMaxAggregateInputType = {
    id?: true
    name?: true
    number?: true
    VIP?: true
  }

  export type CustomerCountAggregateInputType = {
    id?: true
    name?: true
    number?: true
    VIP?: true
    _all?: true
  }

  export type CustomerAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customer to aggregate.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Customers
    **/
    _count?: true | CustomerCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CustomerMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CustomerMaxAggregateInputType
  }

  export type GetCustomerAggregateType<T extends CustomerAggregateArgs> = {
        [P in keyof T & keyof AggregateCustomer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCustomer[P]>
      : GetScalarType<T[P], AggregateCustomer[P]>
  }




  export type CustomerGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CustomerWhereInput
    orderBy?: CustomerOrderByWithAggregationInput | CustomerOrderByWithAggregationInput[]
    by: CustomerScalarFieldEnum[] | CustomerScalarFieldEnum
    having?: CustomerScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CustomerCountAggregateInputType | true
    _min?: CustomerMinAggregateInputType
    _max?: CustomerMaxAggregateInputType
  }

  export type CustomerGroupByOutputType = {
    id: string
    name: string | null
    number: string | null
    VIP: boolean
    _count: CustomerCountAggregateOutputType | null
    _min: CustomerMinAggregateOutputType | null
    _max: CustomerMaxAggregateOutputType | null
  }

  type GetCustomerGroupByPayload<T extends CustomerGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CustomerGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CustomerGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CustomerGroupByOutputType[P]>
            : GetScalarType<T[P], CustomerGroupByOutputType[P]>
        }
      >
    >


  export type CustomerSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    number?: boolean
    VIP?: boolean
    queueItems?: boolean | Customer$queueItemsArgs<ExtArgs>
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    number?: boolean
    VIP?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    number?: boolean
    VIP?: boolean
  }, ExtArgs["result"]["customer"]>

  export type CustomerSelectScalar = {
    id?: boolean
    name?: boolean
    number?: boolean
    VIP?: boolean
  }

  export type CustomerOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "number" | "VIP", ExtArgs["result"]["customer"]>
  export type CustomerInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queueItems?: boolean | Customer$queueItemsArgs<ExtArgs>
  }
  export type CustomerIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CustomerIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CustomerPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Customer"
    objects: {
      queueItems: Prisma.$QueueItemPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string | null
      number: string | null
      VIP: boolean
    }, ExtArgs["result"]["customer"]>
    composites: {}
  }

  type CustomerGetPayload<S extends boolean | null | undefined | CustomerDefaultArgs> = $Result.GetResult<Prisma.$CustomerPayload, S>

  type CustomerCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CustomerFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CustomerCountAggregateInputType | true
    }

  export interface CustomerDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Customer'], meta: { name: 'Customer' } }
    /**
     * Find zero or one Customer that matches the filter.
     * @param {CustomerFindUniqueArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CustomerFindUniqueArgs>(args: SelectSubset<T, CustomerFindUniqueArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Customer that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CustomerFindUniqueOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CustomerFindUniqueOrThrowArgs>(args: SelectSubset<T, CustomerFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CustomerFindFirstArgs>(args?: SelectSubset<T, CustomerFindFirstArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Customer that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindFirstOrThrowArgs} args - Arguments to find a Customer
     * @example
     * // Get one Customer
     * const customer = await prisma.customer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CustomerFindFirstOrThrowArgs>(args?: SelectSubset<T, CustomerFindFirstOrThrowArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Customers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Customers
     * const customers = await prisma.customer.findMany()
     * 
     * // Get first 10 Customers
     * const customers = await prisma.customer.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const customerWithIdOnly = await prisma.customer.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CustomerFindManyArgs>(args?: SelectSubset<T, CustomerFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Customer.
     * @param {CustomerCreateArgs} args - Arguments to create a Customer.
     * @example
     * // Create one Customer
     * const Customer = await prisma.customer.create({
     *   data: {
     *     // ... data to create a Customer
     *   }
     * })
     * 
     */
    create<T extends CustomerCreateArgs>(args: SelectSubset<T, CustomerCreateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Customers.
     * @param {CustomerCreateManyArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CustomerCreateManyArgs>(args?: SelectSubset<T, CustomerCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Customers and returns the data saved in the database.
     * @param {CustomerCreateManyAndReturnArgs} args - Arguments to create many Customers.
     * @example
     * // Create many Customers
     * const customer = await prisma.customer.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CustomerCreateManyAndReturnArgs>(args?: SelectSubset<T, CustomerCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Customer.
     * @param {CustomerDeleteArgs} args - Arguments to delete one Customer.
     * @example
     * // Delete one Customer
     * const Customer = await prisma.customer.delete({
     *   where: {
     *     // ... filter to delete one Customer
     *   }
     * })
     * 
     */
    delete<T extends CustomerDeleteArgs>(args: SelectSubset<T, CustomerDeleteArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Customer.
     * @param {CustomerUpdateArgs} args - Arguments to update one Customer.
     * @example
     * // Update one Customer
     * const customer = await prisma.customer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CustomerUpdateArgs>(args: SelectSubset<T, CustomerUpdateArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Customers.
     * @param {CustomerDeleteManyArgs} args - Arguments to filter Customers to delete.
     * @example
     * // Delete a few Customers
     * const { count } = await prisma.customer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CustomerDeleteManyArgs>(args?: SelectSubset<T, CustomerDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CustomerUpdateManyArgs>(args: SelectSubset<T, CustomerUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Customers and returns the data updated in the database.
     * @param {CustomerUpdateManyAndReturnArgs} args - Arguments to update many Customers.
     * @example
     * // Update many Customers
     * const customer = await prisma.customer.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Customers and only return the `id`
     * const customerWithIdOnly = await prisma.customer.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CustomerUpdateManyAndReturnArgs>(args: SelectSubset<T, CustomerUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Customer.
     * @param {CustomerUpsertArgs} args - Arguments to update or create a Customer.
     * @example
     * // Update or create a Customer
     * const customer = await prisma.customer.upsert({
     *   create: {
     *     // ... data to create a Customer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Customer we want to update
     *   }
     * })
     */
    upsert<T extends CustomerUpsertArgs>(args: SelectSubset<T, CustomerUpsertArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Customers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerCountArgs} args - Arguments to filter Customers to count.
     * @example
     * // Count the number of Customers
     * const count = await prisma.customer.count({
     *   where: {
     *     // ... the filter for the Customers we want to count
     *   }
     * })
    **/
    count<T extends CustomerCountArgs>(
      args?: Subset<T, CustomerCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CustomerCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CustomerAggregateArgs>(args: Subset<T, CustomerAggregateArgs>): Prisma.PrismaPromise<GetCustomerAggregateType<T>>

    /**
     * Group by Customer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CustomerGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CustomerGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CustomerGroupByArgs['orderBy'] }
        : { orderBy?: CustomerGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CustomerGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCustomerGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Customer model
   */
  readonly fields: CustomerFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Customer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CustomerClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    queueItems<T extends Customer$queueItemsArgs<ExtArgs> = {}>(args?: Subset<T, Customer$queueItemsArgs<ExtArgs>>): Prisma__QueueItemClient<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Customer model
   */
  interface CustomerFieldRefs {
    readonly id: FieldRef<"Customer", 'String'>
    readonly name: FieldRef<"Customer", 'String'>
    readonly number: FieldRef<"Customer", 'String'>
    readonly VIP: FieldRef<"Customer", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Customer findUnique
   */
  export type CustomerFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findUniqueOrThrow
   */
  export type CustomerFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer findFirst
   */
  export type CustomerFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findFirstOrThrow
   */
  export type CustomerFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customer to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Customers.
     */
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer findMany
   */
  export type CustomerFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter, which Customers to fetch.
     */
    where?: CustomerWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Customers to fetch.
     */
    orderBy?: CustomerOrderByWithRelationInput | CustomerOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Customers.
     */
    cursor?: CustomerWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Customers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Customers.
     */
    skip?: number
    distinct?: CustomerScalarFieldEnum | CustomerScalarFieldEnum[]
  }

  /**
   * Customer create
   */
  export type CustomerCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to create a Customer.
     */
    data?: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
  }

  /**
   * Customer createMany
   */
  export type CustomerCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer createManyAndReturn
   */
  export type CustomerCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to create many Customers.
     */
    data: CustomerCreateManyInput | CustomerCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Customer update
   */
  export type CustomerUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The data needed to update a Customer.
     */
    data: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
    /**
     * Choose, which Customer to update.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer updateMany
   */
  export type CustomerUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer updateManyAndReturn
   */
  export type CustomerUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * The data used to update Customers.
     */
    data: XOR<CustomerUpdateManyMutationInput, CustomerUncheckedUpdateManyInput>
    /**
     * Filter which Customers to update
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to update.
     */
    limit?: number
  }

  /**
   * Customer upsert
   */
  export type CustomerUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * The filter to search for the Customer to update in case it exists.
     */
    where: CustomerWhereUniqueInput
    /**
     * In case the Customer found by the `where` argument doesn't exist, create a new Customer with this data.
     */
    create: XOR<CustomerCreateInput, CustomerUncheckedCreateInput>
    /**
     * In case the Customer was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CustomerUpdateInput, CustomerUncheckedUpdateInput>
  }

  /**
   * Customer delete
   */
  export type CustomerDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    /**
     * Filter which Customer to delete.
     */
    where: CustomerWhereUniqueInput
  }

  /**
   * Customer deleteMany
   */
  export type CustomerDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Customers to delete
     */
    where?: CustomerWhereInput
    /**
     * Limit how many Customers to delete.
     */
    limit?: number
  }

  /**
   * Customer.queueItems
   */
  export type Customer$queueItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    where?: QueueItemWhereInput
  }

  /**
   * Customer without action
   */
  export type CustomerDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
  }


  /**
   * Model QueueItem
   */

  export type AggregateQueueItem = {
    _count: QueueItemCountAggregateOutputType | null
    _avg: QueueItemAvgAggregateOutputType | null
    _sum: QueueItemSumAggregateOutputType | null
    _min: QueueItemMinAggregateOutputType | null
    _max: QueueItemMaxAggregateOutputType | null
  }

  export type QueueItemAvgAggregateOutputType = {
    id: number | null
    queueId: number | null
    pax: number | null
  }

  export type QueueItemSumAggregateOutputType = {
    id: number | null
    queueId: number | null
    pax: number | null
  }

  export type QueueItemMinAggregateOutputType = {
    id: number | null
    queueId: number | null
    customerId: string | null
    createdAt: Date | null
    pax: number | null
    called: boolean | null
    seated: boolean | null
    quit: boolean | null
    active: boolean | null
  }

  export type QueueItemMaxAggregateOutputType = {
    id: number | null
    queueId: number | null
    customerId: string | null
    createdAt: Date | null
    pax: number | null
    called: boolean | null
    seated: boolean | null
    quit: boolean | null
    active: boolean | null
  }

  export type QueueItemCountAggregateOutputType = {
    id: number
    queueId: number
    customerId: number
    createdAt: number
    pax: number
    called: number
    seated: number
    quit: number
    active: number
    _all: number
  }


  export type QueueItemAvgAggregateInputType = {
    id?: true
    queueId?: true
    pax?: true
  }

  export type QueueItemSumAggregateInputType = {
    id?: true
    queueId?: true
    pax?: true
  }

  export type QueueItemMinAggregateInputType = {
    id?: true
    queueId?: true
    customerId?: true
    createdAt?: true
    pax?: true
    called?: true
    seated?: true
    quit?: true
    active?: true
  }

  export type QueueItemMaxAggregateInputType = {
    id?: true
    queueId?: true
    customerId?: true
    createdAt?: true
    pax?: true
    called?: true
    seated?: true
    quit?: true
    active?: true
  }

  export type QueueItemCountAggregateInputType = {
    id?: true
    queueId?: true
    customerId?: true
    createdAt?: true
    pax?: true
    called?: true
    seated?: true
    quit?: true
    active?: true
    _all?: true
  }

  export type QueueItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueItem to aggregate.
     */
    where?: QueueItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueItems to fetch.
     */
    orderBy?: QueueItemOrderByWithRelationInput | QueueItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QueueItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned QueueItems
    **/
    _count?: true | QueueItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QueueItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QueueItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QueueItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QueueItemMaxAggregateInputType
  }

  export type GetQueueItemAggregateType<T extends QueueItemAggregateArgs> = {
        [P in keyof T & keyof AggregateQueueItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQueueItem[P]>
      : GetScalarType<T[P], AggregateQueueItem[P]>
  }




  export type QueueItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QueueItemWhereInput
    orderBy?: QueueItemOrderByWithAggregationInput | QueueItemOrderByWithAggregationInput[]
    by: QueueItemScalarFieldEnum[] | QueueItemScalarFieldEnum
    having?: QueueItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QueueItemCountAggregateInputType | true
    _avg?: QueueItemAvgAggregateInputType
    _sum?: QueueItemSumAggregateInputType
    _min?: QueueItemMinAggregateInputType
    _max?: QueueItemMaxAggregateInputType
  }

  export type QueueItemGroupByOutputType = {
    id: number
    queueId: number
    customerId: string | null
    createdAt: Date
    pax: number
    called: boolean
    seated: boolean
    quit: boolean
    active: boolean
    _count: QueueItemCountAggregateOutputType | null
    _avg: QueueItemAvgAggregateOutputType | null
    _sum: QueueItemSumAggregateOutputType | null
    _min: QueueItemMinAggregateOutputType | null
    _max: QueueItemMaxAggregateOutputType | null
  }

  type GetQueueItemGroupByPayload<T extends QueueItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QueueItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QueueItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QueueItemGroupByOutputType[P]>
            : GetScalarType<T[P], QueueItemGroupByOutputType[P]>
        }
      >
    >


  export type QueueItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    queueId?: boolean
    customerId?: boolean
    createdAt?: boolean
    pax?: boolean
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
    queue?: boolean | QueueDefaultArgs<ExtArgs>
    customer?: boolean | QueueItem$customerArgs<ExtArgs>
  }, ExtArgs["result"]["queueItem"]>

  export type QueueItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    queueId?: boolean
    customerId?: boolean
    createdAt?: boolean
    pax?: boolean
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
    queue?: boolean | QueueDefaultArgs<ExtArgs>
    customer?: boolean | QueueItem$customerArgs<ExtArgs>
  }, ExtArgs["result"]["queueItem"]>

  export type QueueItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    queueId?: boolean
    customerId?: boolean
    createdAt?: boolean
    pax?: boolean
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
    queue?: boolean | QueueDefaultArgs<ExtArgs>
    customer?: boolean | QueueItem$customerArgs<ExtArgs>
  }, ExtArgs["result"]["queueItem"]>

  export type QueueItemSelectScalar = {
    id?: boolean
    queueId?: boolean
    customerId?: boolean
    createdAt?: boolean
    pax?: boolean
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
  }

  export type QueueItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "queueId" | "customerId" | "createdAt" | "pax" | "called" | "seated" | "quit" | "active", ExtArgs["result"]["queueItem"]>
  export type QueueItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queue?: boolean | QueueDefaultArgs<ExtArgs>
    customer?: boolean | QueueItem$customerArgs<ExtArgs>
  }
  export type QueueItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queue?: boolean | QueueDefaultArgs<ExtArgs>
    customer?: boolean | QueueItem$customerArgs<ExtArgs>
  }
  export type QueueItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    queue?: boolean | QueueDefaultArgs<ExtArgs>
    customer?: boolean | QueueItem$customerArgs<ExtArgs>
  }

  export type $QueueItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "QueueItem"
    objects: {
      queue: Prisma.$QueuePayload<ExtArgs>
      customer: Prisma.$CustomerPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      queueId: number
      customerId: string | null
      createdAt: Date
      pax: number
      called: boolean
      seated: boolean
      quit: boolean
      active: boolean
    }, ExtArgs["result"]["queueItem"]>
    composites: {}
  }

  type QueueItemGetPayload<S extends boolean | null | undefined | QueueItemDefaultArgs> = $Result.GetResult<Prisma.$QueueItemPayload, S>

  type QueueItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QueueItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QueueItemCountAggregateInputType | true
    }

  export interface QueueItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['QueueItem'], meta: { name: 'QueueItem' } }
    /**
     * Find zero or one QueueItem that matches the filter.
     * @param {QueueItemFindUniqueArgs} args - Arguments to find a QueueItem
     * @example
     * // Get one QueueItem
     * const queueItem = await prisma.queueItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QueueItemFindUniqueArgs>(args: SelectSubset<T, QueueItemFindUniqueArgs<ExtArgs>>): Prisma__QueueItemClient<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one QueueItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QueueItemFindUniqueOrThrowArgs} args - Arguments to find a QueueItem
     * @example
     * // Get one QueueItem
     * const queueItem = await prisma.queueItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QueueItemFindUniqueOrThrowArgs>(args: SelectSubset<T, QueueItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QueueItemClient<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueItemFindFirstArgs} args - Arguments to find a QueueItem
     * @example
     * // Get one QueueItem
     * const queueItem = await prisma.queueItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QueueItemFindFirstArgs>(args?: SelectSubset<T, QueueItemFindFirstArgs<ExtArgs>>): Prisma__QueueItemClient<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first QueueItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueItemFindFirstOrThrowArgs} args - Arguments to find a QueueItem
     * @example
     * // Get one QueueItem
     * const queueItem = await prisma.queueItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QueueItemFindFirstOrThrowArgs>(args?: SelectSubset<T, QueueItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__QueueItemClient<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more QueueItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all QueueItems
     * const queueItems = await prisma.queueItem.findMany()
     * 
     * // Get first 10 QueueItems
     * const queueItems = await prisma.queueItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const queueItemWithIdOnly = await prisma.queueItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QueueItemFindManyArgs>(args?: SelectSubset<T, QueueItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a QueueItem.
     * @param {QueueItemCreateArgs} args - Arguments to create a QueueItem.
     * @example
     * // Create one QueueItem
     * const QueueItem = await prisma.queueItem.create({
     *   data: {
     *     // ... data to create a QueueItem
     *   }
     * })
     * 
     */
    create<T extends QueueItemCreateArgs>(args: SelectSubset<T, QueueItemCreateArgs<ExtArgs>>): Prisma__QueueItemClient<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many QueueItems.
     * @param {QueueItemCreateManyArgs} args - Arguments to create many QueueItems.
     * @example
     * // Create many QueueItems
     * const queueItem = await prisma.queueItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QueueItemCreateManyArgs>(args?: SelectSubset<T, QueueItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many QueueItems and returns the data saved in the database.
     * @param {QueueItemCreateManyAndReturnArgs} args - Arguments to create many QueueItems.
     * @example
     * // Create many QueueItems
     * const queueItem = await prisma.queueItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many QueueItems and only return the `id`
     * const queueItemWithIdOnly = await prisma.queueItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends QueueItemCreateManyAndReturnArgs>(args?: SelectSubset<T, QueueItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a QueueItem.
     * @param {QueueItemDeleteArgs} args - Arguments to delete one QueueItem.
     * @example
     * // Delete one QueueItem
     * const QueueItem = await prisma.queueItem.delete({
     *   where: {
     *     // ... filter to delete one QueueItem
     *   }
     * })
     * 
     */
    delete<T extends QueueItemDeleteArgs>(args: SelectSubset<T, QueueItemDeleteArgs<ExtArgs>>): Prisma__QueueItemClient<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one QueueItem.
     * @param {QueueItemUpdateArgs} args - Arguments to update one QueueItem.
     * @example
     * // Update one QueueItem
     * const queueItem = await prisma.queueItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QueueItemUpdateArgs>(args: SelectSubset<T, QueueItemUpdateArgs<ExtArgs>>): Prisma__QueueItemClient<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more QueueItems.
     * @param {QueueItemDeleteManyArgs} args - Arguments to filter QueueItems to delete.
     * @example
     * // Delete a few QueueItems
     * const { count } = await prisma.queueItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QueueItemDeleteManyArgs>(args?: SelectSubset<T, QueueItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many QueueItems
     * const queueItem = await prisma.queueItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QueueItemUpdateManyArgs>(args: SelectSubset<T, QueueItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more QueueItems and returns the data updated in the database.
     * @param {QueueItemUpdateManyAndReturnArgs} args - Arguments to update many QueueItems.
     * @example
     * // Update many QueueItems
     * const queueItem = await prisma.queueItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more QueueItems and only return the `id`
     * const queueItemWithIdOnly = await prisma.queueItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends QueueItemUpdateManyAndReturnArgs>(args: SelectSubset<T, QueueItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one QueueItem.
     * @param {QueueItemUpsertArgs} args - Arguments to update or create a QueueItem.
     * @example
     * // Update or create a QueueItem
     * const queueItem = await prisma.queueItem.upsert({
     *   create: {
     *     // ... data to create a QueueItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the QueueItem we want to update
     *   }
     * })
     */
    upsert<T extends QueueItemUpsertArgs>(args: SelectSubset<T, QueueItemUpsertArgs<ExtArgs>>): Prisma__QueueItemClient<$Result.GetResult<Prisma.$QueueItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of QueueItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueItemCountArgs} args - Arguments to filter QueueItems to count.
     * @example
     * // Count the number of QueueItems
     * const count = await prisma.queueItem.count({
     *   where: {
     *     // ... the filter for the QueueItems we want to count
     *   }
     * })
    **/
    count<T extends QueueItemCountArgs>(
      args?: Subset<T, QueueItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QueueItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a QueueItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QueueItemAggregateArgs>(args: Subset<T, QueueItemAggregateArgs>): Prisma.PrismaPromise<GetQueueItemAggregateType<T>>

    /**
     * Group by QueueItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QueueItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QueueItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QueueItemGroupByArgs['orderBy'] }
        : { orderBy?: QueueItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QueueItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQueueItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the QueueItem model
   */
  readonly fields: QueueItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for QueueItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QueueItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    queue<T extends QueueDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QueueDefaultArgs<ExtArgs>>): Prisma__QueueClient<$Result.GetResult<Prisma.$QueuePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    customer<T extends QueueItem$customerArgs<ExtArgs> = {}>(args?: Subset<T, QueueItem$customerArgs<ExtArgs>>): Prisma__CustomerClient<$Result.GetResult<Prisma.$CustomerPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the QueueItem model
   */
  interface QueueItemFieldRefs {
    readonly id: FieldRef<"QueueItem", 'Int'>
    readonly queueId: FieldRef<"QueueItem", 'Int'>
    readonly customerId: FieldRef<"QueueItem", 'String'>
    readonly createdAt: FieldRef<"QueueItem", 'DateTime'>
    readonly pax: FieldRef<"QueueItem", 'Int'>
    readonly called: FieldRef<"QueueItem", 'Boolean'>
    readonly seated: FieldRef<"QueueItem", 'Boolean'>
    readonly quit: FieldRef<"QueueItem", 'Boolean'>
    readonly active: FieldRef<"QueueItem", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * QueueItem findUnique
   */
  export type QueueItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    /**
     * Filter, which QueueItem to fetch.
     */
    where: QueueItemWhereUniqueInput
  }

  /**
   * QueueItem findUniqueOrThrow
   */
  export type QueueItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    /**
     * Filter, which QueueItem to fetch.
     */
    where: QueueItemWhereUniqueInput
  }

  /**
   * QueueItem findFirst
   */
  export type QueueItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    /**
     * Filter, which QueueItem to fetch.
     */
    where?: QueueItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueItems to fetch.
     */
    orderBy?: QueueItemOrderByWithRelationInput | QueueItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueItems.
     */
    cursor?: QueueItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueItems.
     */
    distinct?: QueueItemScalarFieldEnum | QueueItemScalarFieldEnum[]
  }

  /**
   * QueueItem findFirstOrThrow
   */
  export type QueueItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    /**
     * Filter, which QueueItem to fetch.
     */
    where?: QueueItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueItems to fetch.
     */
    orderBy?: QueueItemOrderByWithRelationInput | QueueItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for QueueItems.
     */
    cursor?: QueueItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of QueueItems.
     */
    distinct?: QueueItemScalarFieldEnum | QueueItemScalarFieldEnum[]
  }

  /**
   * QueueItem findMany
   */
  export type QueueItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    /**
     * Filter, which QueueItems to fetch.
     */
    where?: QueueItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of QueueItems to fetch.
     */
    orderBy?: QueueItemOrderByWithRelationInput | QueueItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing QueueItems.
     */
    cursor?: QueueItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` QueueItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` QueueItems.
     */
    skip?: number
    distinct?: QueueItemScalarFieldEnum | QueueItemScalarFieldEnum[]
  }

  /**
   * QueueItem create
   */
  export type QueueItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    /**
     * The data needed to create a QueueItem.
     */
    data: XOR<QueueItemCreateInput, QueueItemUncheckedCreateInput>
  }

  /**
   * QueueItem createMany
   */
  export type QueueItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many QueueItems.
     */
    data: QueueItemCreateManyInput | QueueItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * QueueItem createManyAndReturn
   */
  export type QueueItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * The data used to create many QueueItems.
     */
    data: QueueItemCreateManyInput | QueueItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueueItem update
   */
  export type QueueItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    /**
     * The data needed to update a QueueItem.
     */
    data: XOR<QueueItemUpdateInput, QueueItemUncheckedUpdateInput>
    /**
     * Choose, which QueueItem to update.
     */
    where: QueueItemWhereUniqueInput
  }

  /**
   * QueueItem updateMany
   */
  export type QueueItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update QueueItems.
     */
    data: XOR<QueueItemUpdateManyMutationInput, QueueItemUncheckedUpdateManyInput>
    /**
     * Filter which QueueItems to update
     */
    where?: QueueItemWhereInput
    /**
     * Limit how many QueueItems to update.
     */
    limit?: number
  }

  /**
   * QueueItem updateManyAndReturn
   */
  export type QueueItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * The data used to update QueueItems.
     */
    data: XOR<QueueItemUpdateManyMutationInput, QueueItemUncheckedUpdateManyInput>
    /**
     * Filter which QueueItems to update
     */
    where?: QueueItemWhereInput
    /**
     * Limit how many QueueItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * QueueItem upsert
   */
  export type QueueItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    /**
     * The filter to search for the QueueItem to update in case it exists.
     */
    where: QueueItemWhereUniqueInput
    /**
     * In case the QueueItem found by the `where` argument doesn't exist, create a new QueueItem with this data.
     */
    create: XOR<QueueItemCreateInput, QueueItemUncheckedCreateInput>
    /**
     * In case the QueueItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QueueItemUpdateInput, QueueItemUncheckedUpdateInput>
  }

  /**
   * QueueItem delete
   */
  export type QueueItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
    /**
     * Filter which QueueItem to delete.
     */
    where: QueueItemWhereUniqueInput
  }

  /**
   * QueueItem deleteMany
   */
  export type QueueItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which QueueItems to delete
     */
    where?: QueueItemWhereInput
    /**
     * Limit how many QueueItems to delete.
     */
    limit?: number
  }

  /**
   * QueueItem.customer
   */
  export type QueueItem$customerArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Customer
     */
    select?: CustomerSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Customer
     */
    omit?: CustomerOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CustomerInclude<ExtArgs> | null
    where?: CustomerWhereInput
  }

  /**
   * QueueItem without action
   */
  export type QueueItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QueueItem
     */
    select?: QueueItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the QueueItem
     */
    omit?: QueueItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QueueItemInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    name: 'name',
    email: 'email',
    password: 'password',
    hasPassword: 'hasPassword'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const OAuthTokenScalarFieldEnum: {
    id: 'id',
    provider: 'provider',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    userId: 'userId'
  };

  export type OAuthTokenScalarFieldEnum = (typeof OAuthTokenScalarFieldEnum)[keyof typeof OAuthTokenScalarFieldEnum]


  export const OutletScalarFieldEnum: {
    id: 'id',
    name: 'name',
    userId: 'userId'
  };

  export type OutletScalarFieldEnum = (typeof OutletScalarFieldEnum)[keyof typeof OutletScalarFieldEnum]


  export const QueueScalarFieldEnum: {
    id: 'id',
    outletId: 'outletId',
    startTime: 'startTime',
    endTime: 'endTime',
    active: 'active',
    name: 'name'
  };

  export type QueueScalarFieldEnum = (typeof QueueScalarFieldEnum)[keyof typeof QueueScalarFieldEnum]


  export const CustomerScalarFieldEnum: {
    id: 'id',
    name: 'name',
    number: 'number',
    VIP: 'VIP'
  };

  export type CustomerScalarFieldEnum = (typeof CustomerScalarFieldEnum)[keyof typeof CustomerScalarFieldEnum]


  export const QueueItemScalarFieldEnum: {
    id: 'id',
    queueId: 'queueId',
    customerId: 'customerId',
    createdAt: 'createdAt',
    pax: 'pax',
    called: 'called',
    seated: 'seated',
    quit: 'quit',
    active: 'active'
  };

  export type QueueItemScalarFieldEnum = (typeof QueueItemScalarFieldEnum)[keyof typeof QueueItemScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    name?: StringNullableFilter<"User"> | string | null
    email?: StringFilter<"User"> | string
    password?: StringNullableFilter<"User"> | string | null
    hasPassword?: BoolFilter<"User"> | boolean
    outlets?: OutletListRelationFilter
    OAuthToken?: OAuthTokenListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    hasPassword?: SortOrder
    outlets?: OutletOrderByRelationAggregateInput
    OAuthToken?: OAuthTokenOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    createdAt?: DateTimeFilter<"User"> | Date | string
    name?: StringNullableFilter<"User"> | string | null
    password?: StringNullableFilter<"User"> | string | null
    hasPassword?: BoolFilter<"User"> | boolean
    outlets?: OutletListRelationFilter
    OAuthToken?: OAuthTokenListRelationFilter
  }, "id" | "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrderInput | SortOrder
    email?: SortOrder
    password?: SortOrderInput | SortOrder
    hasPassword?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    name?: StringNullableWithAggregatesFilter<"User"> | string | null
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringNullableWithAggregatesFilter<"User"> | string | null
    hasPassword?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type OAuthTokenWhereInput = {
    AND?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    OR?: OAuthTokenWhereInput[]
    NOT?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    id?: IntFilter<"OAuthToken"> | number
    provider?: StringFilter<"OAuthToken"> | string
    accessToken?: StringFilter<"OAuthToken"> | string
    refreshToken?: StringNullableFilter<"OAuthToken"> | string | null
    userId?: StringFilter<"OAuthToken"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type OAuthTokenOrderByWithRelationInput = {
    id?: SortOrder
    provider?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type OAuthTokenWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    provider_userId?: OAuthTokenProviderUserIdCompoundUniqueInput
    AND?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    OR?: OAuthTokenWhereInput[]
    NOT?: OAuthTokenWhereInput | OAuthTokenWhereInput[]
    provider?: StringFilter<"OAuthToken"> | string
    accessToken?: StringFilter<"OAuthToken"> | string
    refreshToken?: StringNullableFilter<"OAuthToken"> | string | null
    userId?: StringFilter<"OAuthToken"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "provider_userId">

  export type OAuthTokenOrderByWithAggregationInput = {
    id?: SortOrder
    provider?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: OAuthTokenCountOrderByAggregateInput
    _avg?: OAuthTokenAvgOrderByAggregateInput
    _max?: OAuthTokenMaxOrderByAggregateInput
    _min?: OAuthTokenMinOrderByAggregateInput
    _sum?: OAuthTokenSumOrderByAggregateInput
  }

  export type OAuthTokenScalarWhereWithAggregatesInput = {
    AND?: OAuthTokenScalarWhereWithAggregatesInput | OAuthTokenScalarWhereWithAggregatesInput[]
    OR?: OAuthTokenScalarWhereWithAggregatesInput[]
    NOT?: OAuthTokenScalarWhereWithAggregatesInput | OAuthTokenScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"OAuthToken"> | number
    provider?: StringWithAggregatesFilter<"OAuthToken"> | string
    accessToken?: StringWithAggregatesFilter<"OAuthToken"> | string
    refreshToken?: StringNullableWithAggregatesFilter<"OAuthToken"> | string | null
    userId?: StringWithAggregatesFilter<"OAuthToken"> | string
  }

  export type OutletWhereInput = {
    AND?: OutletWhereInput | OutletWhereInput[]
    OR?: OutletWhereInput[]
    NOT?: OutletWhereInput | OutletWhereInput[]
    id?: IntFilter<"Outlet"> | number
    name?: StringNullableFilter<"Outlet"> | string | null
    userId?: StringFilter<"Outlet"> | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    queues?: QueueListRelationFilter
  }

  export type OutletOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    userId?: SortOrder
    user?: UserOrderByWithRelationInput
    queues?: QueueOrderByRelationAggregateInput
  }

  export type OutletWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId?: string
    AND?: OutletWhereInput | OutletWhereInput[]
    OR?: OutletWhereInput[]
    NOT?: OutletWhereInput | OutletWhereInput[]
    name?: StringNullableFilter<"Outlet"> | string | null
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    queues?: QueueListRelationFilter
  }, "id" | "id" | "userId">

  export type OutletOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: OutletCountOrderByAggregateInput
    _avg?: OutletAvgOrderByAggregateInput
    _max?: OutletMaxOrderByAggregateInput
    _min?: OutletMinOrderByAggregateInput
    _sum?: OutletSumOrderByAggregateInput
  }

  export type OutletScalarWhereWithAggregatesInput = {
    AND?: OutletScalarWhereWithAggregatesInput | OutletScalarWhereWithAggregatesInput[]
    OR?: OutletScalarWhereWithAggregatesInput[]
    NOT?: OutletScalarWhereWithAggregatesInput | OutletScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Outlet"> | number
    name?: StringNullableWithAggregatesFilter<"Outlet"> | string | null
    userId?: StringWithAggregatesFilter<"Outlet"> | string
  }

  export type QueueWhereInput = {
    AND?: QueueWhereInput | QueueWhereInput[]
    OR?: QueueWhereInput[]
    NOT?: QueueWhereInput | QueueWhereInput[]
    id?: IntFilter<"Queue"> | number
    outletId?: IntFilter<"Queue"> | number
    startTime?: DateTimeFilter<"Queue"> | Date | string
    endTime?: DateTimeNullableFilter<"Queue"> | Date | string | null
    active?: BoolFilter<"Queue"> | boolean
    name?: StringNullableFilter<"Queue"> | string | null
    outlet?: XOR<OutletScalarRelationFilter, OutletWhereInput>
    queueItems?: QueueItemListRelationFilter
  }

  export type QueueOrderByWithRelationInput = {
    id?: SortOrder
    outletId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    active?: SortOrder
    name?: SortOrderInput | SortOrder
    outlet?: OutletOrderByWithRelationInput
    queueItems?: QueueItemOrderByRelationAggregateInput
  }

  export type QueueWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: QueueWhereInput | QueueWhereInput[]
    OR?: QueueWhereInput[]
    NOT?: QueueWhereInput | QueueWhereInput[]
    outletId?: IntFilter<"Queue"> | number
    startTime?: DateTimeFilter<"Queue"> | Date | string
    endTime?: DateTimeNullableFilter<"Queue"> | Date | string | null
    active?: BoolFilter<"Queue"> | boolean
    name?: StringNullableFilter<"Queue"> | string | null
    outlet?: XOR<OutletScalarRelationFilter, OutletWhereInput>
    queueItems?: QueueItemListRelationFilter
  }, "id" | "id">

  export type QueueOrderByWithAggregationInput = {
    id?: SortOrder
    outletId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrderInput | SortOrder
    active?: SortOrder
    name?: SortOrderInput | SortOrder
    _count?: QueueCountOrderByAggregateInput
    _avg?: QueueAvgOrderByAggregateInput
    _max?: QueueMaxOrderByAggregateInput
    _min?: QueueMinOrderByAggregateInput
    _sum?: QueueSumOrderByAggregateInput
  }

  export type QueueScalarWhereWithAggregatesInput = {
    AND?: QueueScalarWhereWithAggregatesInput | QueueScalarWhereWithAggregatesInput[]
    OR?: QueueScalarWhereWithAggregatesInput[]
    NOT?: QueueScalarWhereWithAggregatesInput | QueueScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Queue"> | number
    outletId?: IntWithAggregatesFilter<"Queue"> | number
    startTime?: DateTimeWithAggregatesFilter<"Queue"> | Date | string
    endTime?: DateTimeNullableWithAggregatesFilter<"Queue"> | Date | string | null
    active?: BoolWithAggregatesFilter<"Queue"> | boolean
    name?: StringNullableWithAggregatesFilter<"Queue"> | string | null
  }

  export type CustomerWhereInput = {
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    id?: StringFilter<"Customer"> | string
    name?: StringNullableFilter<"Customer"> | string | null
    number?: StringNullableFilter<"Customer"> | string | null
    VIP?: BoolFilter<"Customer"> | boolean
    queueItems?: XOR<QueueItemNullableScalarRelationFilter, QueueItemWhereInput> | null
  }

  export type CustomerOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    number?: SortOrderInput | SortOrder
    VIP?: SortOrder
    queueItems?: QueueItemOrderByWithRelationInput
  }

  export type CustomerWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CustomerWhereInput | CustomerWhereInput[]
    OR?: CustomerWhereInput[]
    NOT?: CustomerWhereInput | CustomerWhereInput[]
    name?: StringNullableFilter<"Customer"> | string | null
    number?: StringNullableFilter<"Customer"> | string | null
    VIP?: BoolFilter<"Customer"> | boolean
    queueItems?: XOR<QueueItemNullableScalarRelationFilter, QueueItemWhereInput> | null
  }, "id" | "id">

  export type CustomerOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrderInput | SortOrder
    number?: SortOrderInput | SortOrder
    VIP?: SortOrder
    _count?: CustomerCountOrderByAggregateInput
    _max?: CustomerMaxOrderByAggregateInput
    _min?: CustomerMinOrderByAggregateInput
  }

  export type CustomerScalarWhereWithAggregatesInput = {
    AND?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    OR?: CustomerScalarWhereWithAggregatesInput[]
    NOT?: CustomerScalarWhereWithAggregatesInput | CustomerScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Customer"> | string
    name?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    number?: StringNullableWithAggregatesFilter<"Customer"> | string | null
    VIP?: BoolWithAggregatesFilter<"Customer"> | boolean
  }

  export type QueueItemWhereInput = {
    AND?: QueueItemWhereInput | QueueItemWhereInput[]
    OR?: QueueItemWhereInput[]
    NOT?: QueueItemWhereInput | QueueItemWhereInput[]
    id?: IntFilter<"QueueItem"> | number
    queueId?: IntFilter<"QueueItem"> | number
    customerId?: StringNullableFilter<"QueueItem"> | string | null
    createdAt?: DateTimeFilter<"QueueItem"> | Date | string
    pax?: IntFilter<"QueueItem"> | number
    called?: BoolFilter<"QueueItem"> | boolean
    seated?: BoolFilter<"QueueItem"> | boolean
    quit?: BoolFilter<"QueueItem"> | boolean
    active?: BoolFilter<"QueueItem"> | boolean
    queue?: XOR<QueueScalarRelationFilter, QueueWhereInput>
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }

  export type QueueItemOrderByWithRelationInput = {
    id?: SortOrder
    queueId?: SortOrder
    customerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    pax?: SortOrder
    called?: SortOrder
    seated?: SortOrder
    quit?: SortOrder
    active?: SortOrder
    queue?: QueueOrderByWithRelationInput
    customer?: CustomerOrderByWithRelationInput
  }

  export type QueueItemWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    customerId?: string
    AND?: QueueItemWhereInput | QueueItemWhereInput[]
    OR?: QueueItemWhereInput[]
    NOT?: QueueItemWhereInput | QueueItemWhereInput[]
    queueId?: IntFilter<"QueueItem"> | number
    createdAt?: DateTimeFilter<"QueueItem"> | Date | string
    pax?: IntFilter<"QueueItem"> | number
    called?: BoolFilter<"QueueItem"> | boolean
    seated?: BoolFilter<"QueueItem"> | boolean
    quit?: BoolFilter<"QueueItem"> | boolean
    active?: BoolFilter<"QueueItem"> | boolean
    queue?: XOR<QueueScalarRelationFilter, QueueWhereInput>
    customer?: XOR<CustomerNullableScalarRelationFilter, CustomerWhereInput> | null
  }, "id" | "customerId">

  export type QueueItemOrderByWithAggregationInput = {
    id?: SortOrder
    queueId?: SortOrder
    customerId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    pax?: SortOrder
    called?: SortOrder
    seated?: SortOrder
    quit?: SortOrder
    active?: SortOrder
    _count?: QueueItemCountOrderByAggregateInput
    _avg?: QueueItemAvgOrderByAggregateInput
    _max?: QueueItemMaxOrderByAggregateInput
    _min?: QueueItemMinOrderByAggregateInput
    _sum?: QueueItemSumOrderByAggregateInput
  }

  export type QueueItemScalarWhereWithAggregatesInput = {
    AND?: QueueItemScalarWhereWithAggregatesInput | QueueItemScalarWhereWithAggregatesInput[]
    OR?: QueueItemScalarWhereWithAggregatesInput[]
    NOT?: QueueItemScalarWhereWithAggregatesInput | QueueItemScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"QueueItem"> | number
    queueId?: IntWithAggregatesFilter<"QueueItem"> | number
    customerId?: StringNullableWithAggregatesFilter<"QueueItem"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"QueueItem"> | Date | string
    pax?: IntWithAggregatesFilter<"QueueItem"> | number
    called?: BoolWithAggregatesFilter<"QueueItem"> | boolean
    seated?: BoolWithAggregatesFilter<"QueueItem"> | boolean
    quit?: BoolWithAggregatesFilter<"QueueItem"> | boolean
    active?: BoolWithAggregatesFilter<"QueueItem"> | boolean
  }

  export type UserCreateInput = {
    id?: string
    createdAt?: Date | string
    name?: string | null
    email: string
    password?: string | null
    hasPassword?: boolean
    outlets?: OutletCreateNestedManyWithoutUserInput
    OAuthToken?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    createdAt?: Date | string
    name?: string | null
    email: string
    password?: string | null
    hasPassword?: boolean
    outlets?: OutletUncheckedCreateNestedManyWithoutUserInput
    OAuthToken?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    outlets?: OutletUpdateManyWithoutUserNestedInput
    OAuthToken?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    outlets?: OutletUncheckedUpdateManyWithoutUserNestedInput
    OAuthToken?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    createdAt?: Date | string
    name?: string | null
    email: string
    password?: string | null
    hasPassword?: boolean
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OAuthTokenCreateInput = {
    provider: string
    accessToken: string
    refreshToken?: string | null
    user: UserCreateNestedOneWithoutOAuthTokenInput
  }

  export type OAuthTokenUncheckedCreateInput = {
    id?: number
    provider: string
    accessToken: string
    refreshToken?: string | null
    userId: string
  }

  export type OAuthTokenUpdateInput = {
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOAuthTokenNestedInput
  }

  export type OAuthTokenUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type OAuthTokenCreateManyInput = {
    id?: number
    provider: string
    accessToken: string
    refreshToken?: string | null
    userId: string
  }

  export type OAuthTokenUpdateManyMutationInput = {
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OAuthTokenUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type OutletCreateInput = {
    name?: string | null
    user: UserCreateNestedOneWithoutOutletsInput
    queues?: QueueCreateNestedManyWithoutOutletInput
  }

  export type OutletUncheckedCreateInput = {
    id?: number
    name?: string | null
    userId: string
    queues?: QueueUncheckedCreateNestedManyWithoutOutletInput
  }

  export type OutletUpdateInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOutletsNestedInput
    queues?: QueueUpdateManyWithoutOutletNestedInput
  }

  export type OutletUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    queues?: QueueUncheckedUpdateManyWithoutOutletNestedInput
  }

  export type OutletCreateManyInput = {
    id?: number
    name?: string | null
    userId: string
  }

  export type OutletUpdateManyMutationInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OutletUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type QueueCreateInput = {
    startTime?: Date | string
    endTime?: Date | string | null
    active?: boolean
    name?: string | null
    outlet: OutletCreateNestedOneWithoutQueuesInput
    queueItems?: QueueItemCreateNestedManyWithoutQueueInput
  }

  export type QueueUncheckedCreateInput = {
    id?: number
    outletId: number
    startTime?: Date | string
    endTime?: Date | string | null
    active?: boolean
    name?: string | null
    queueItems?: QueueItemUncheckedCreateNestedManyWithoutQueueInput
  }

  export type QueueUpdateInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    outlet?: OutletUpdateOneRequiredWithoutQueuesNestedInput
    queueItems?: QueueItemUpdateManyWithoutQueueNestedInput
  }

  export type QueueUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    outletId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    queueItems?: QueueItemUncheckedUpdateManyWithoutQueueNestedInput
  }

  export type QueueCreateManyInput = {
    id?: number
    outletId: number
    startTime?: Date | string
    endTime?: Date | string | null
    active?: boolean
    name?: string | null
  }

  export type QueueUpdateManyMutationInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QueueUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    outletId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerCreateInput = {
    id?: string
    name?: string | null
    number?: string | null
    VIP?: boolean
    queueItems?: QueueItemCreateNestedOneWithoutCustomerInput
  }

  export type CustomerUncheckedCreateInput = {
    id?: string
    name?: string | null
    number?: string | null
    VIP?: boolean
    queueItems?: QueueItemUncheckedCreateNestedOneWithoutCustomerInput
  }

  export type CustomerUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    VIP?: BoolFieldUpdateOperationsInput | boolean
    queueItems?: QueueItemUpdateOneWithoutCustomerNestedInput
  }

  export type CustomerUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    VIP?: BoolFieldUpdateOperationsInput | boolean
    queueItems?: QueueItemUncheckedUpdateOneWithoutCustomerNestedInput
  }

  export type CustomerCreateManyInput = {
    id?: string
    name?: string | null
    number?: string | null
    VIP?: boolean
  }

  export type CustomerUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    VIP?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomerUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    VIP?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QueueItemCreateInput = {
    createdAt?: Date | string
    pax: number
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
    queue: QueueCreateNestedOneWithoutQueueItemsInput
    customer?: CustomerCreateNestedOneWithoutQueueItemsInput
  }

  export type QueueItemUncheckedCreateInput = {
    id?: number
    queueId: number
    customerId?: string | null
    createdAt?: Date | string
    pax: number
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
  }

  export type QueueItemUpdateInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pax?: IntFieldUpdateOperationsInput | number
    called?: BoolFieldUpdateOperationsInput | boolean
    seated?: BoolFieldUpdateOperationsInput | boolean
    quit?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    queue?: QueueUpdateOneRequiredWithoutQueueItemsNestedInput
    customer?: CustomerUpdateOneWithoutQueueItemsNestedInput
  }

  export type QueueItemUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    queueId?: IntFieldUpdateOperationsInput | number
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pax?: IntFieldUpdateOperationsInput | number
    called?: BoolFieldUpdateOperationsInput | boolean
    seated?: BoolFieldUpdateOperationsInput | boolean
    quit?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QueueItemCreateManyInput = {
    id?: number
    queueId: number
    customerId?: string | null
    createdAt?: Date | string
    pax: number
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
  }

  export type QueueItemUpdateManyMutationInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pax?: IntFieldUpdateOperationsInput | number
    called?: BoolFieldUpdateOperationsInput | boolean
    seated?: BoolFieldUpdateOperationsInput | boolean
    quit?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QueueItemUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    queueId?: IntFieldUpdateOperationsInput | number
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pax?: IntFieldUpdateOperationsInput | number
    called?: BoolFieldUpdateOperationsInput | boolean
    seated?: BoolFieldUpdateOperationsInput | boolean
    quit?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type OutletListRelationFilter = {
    every?: OutletWhereInput
    some?: OutletWhereInput
    none?: OutletWhereInput
  }

  export type OAuthTokenListRelationFilter = {
    every?: OAuthTokenWhereInput
    some?: OAuthTokenWhereInput
    none?: OAuthTokenWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type OutletOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OAuthTokenOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    hasPassword?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    hasPassword?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    hasPassword?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OAuthTokenProviderUserIdCompoundUniqueInput = {
    provider: string
    userId: string
  }

  export type OAuthTokenCountOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    userId?: SortOrder
  }

  export type OAuthTokenAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OAuthTokenMaxOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    userId?: SortOrder
  }

  export type OAuthTokenMinOrderByAggregateInput = {
    id?: SortOrder
    provider?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    userId?: SortOrder
  }

  export type OAuthTokenSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type QueueListRelationFilter = {
    every?: QueueWhereInput
    some?: QueueWhereInput
    none?: QueueWhereInput
  }

  export type QueueOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type OutletCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type OutletAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type OutletMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type OutletMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    userId?: SortOrder
  }

  export type OutletSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type OutletScalarRelationFilter = {
    is?: OutletWhereInput
    isNot?: OutletWhereInput
  }

  export type QueueItemListRelationFilter = {
    every?: QueueItemWhereInput
    some?: QueueItemWhereInput
    none?: QueueItemWhereInput
  }

  export type QueueItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QueueCountOrderByAggregateInput = {
    id?: SortOrder
    outletId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    active?: SortOrder
    name?: SortOrder
  }

  export type QueueAvgOrderByAggregateInput = {
    id?: SortOrder
    outletId?: SortOrder
  }

  export type QueueMaxOrderByAggregateInput = {
    id?: SortOrder
    outletId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    active?: SortOrder
    name?: SortOrder
  }

  export type QueueMinOrderByAggregateInput = {
    id?: SortOrder
    outletId?: SortOrder
    startTime?: SortOrder
    endTime?: SortOrder
    active?: SortOrder
    name?: SortOrder
  }

  export type QueueSumOrderByAggregateInput = {
    id?: SortOrder
    outletId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type QueueItemNullableScalarRelationFilter = {
    is?: QueueItemWhereInput | null
    isNot?: QueueItemWhereInput | null
  }

  export type CustomerCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    number?: SortOrder
    VIP?: SortOrder
  }

  export type CustomerMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    number?: SortOrder
    VIP?: SortOrder
  }

  export type CustomerMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    number?: SortOrder
    VIP?: SortOrder
  }

  export type QueueScalarRelationFilter = {
    is?: QueueWhereInput
    isNot?: QueueWhereInput
  }

  export type CustomerNullableScalarRelationFilter = {
    is?: CustomerWhereInput | null
    isNot?: CustomerWhereInput | null
  }

  export type QueueItemCountOrderByAggregateInput = {
    id?: SortOrder
    queueId?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    pax?: SortOrder
    called?: SortOrder
    seated?: SortOrder
    quit?: SortOrder
    active?: SortOrder
  }

  export type QueueItemAvgOrderByAggregateInput = {
    id?: SortOrder
    queueId?: SortOrder
    pax?: SortOrder
  }

  export type QueueItemMaxOrderByAggregateInput = {
    id?: SortOrder
    queueId?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    pax?: SortOrder
    called?: SortOrder
    seated?: SortOrder
    quit?: SortOrder
    active?: SortOrder
  }

  export type QueueItemMinOrderByAggregateInput = {
    id?: SortOrder
    queueId?: SortOrder
    customerId?: SortOrder
    createdAt?: SortOrder
    pax?: SortOrder
    called?: SortOrder
    seated?: SortOrder
    quit?: SortOrder
    active?: SortOrder
  }

  export type QueueItemSumOrderByAggregateInput = {
    id?: SortOrder
    queueId?: SortOrder
    pax?: SortOrder
  }

  export type OutletCreateNestedManyWithoutUserInput = {
    create?: XOR<OutletCreateWithoutUserInput, OutletUncheckedCreateWithoutUserInput> | OutletCreateWithoutUserInput[] | OutletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutletCreateOrConnectWithoutUserInput | OutletCreateOrConnectWithoutUserInput[]
    createMany?: OutletCreateManyUserInputEnvelope
    connect?: OutletWhereUniqueInput | OutletWhereUniqueInput[]
  }

  export type OAuthTokenCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type OutletUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OutletCreateWithoutUserInput, OutletUncheckedCreateWithoutUserInput> | OutletCreateWithoutUserInput[] | OutletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutletCreateOrConnectWithoutUserInput | OutletCreateOrConnectWithoutUserInput[]
    createMany?: OutletCreateManyUserInputEnvelope
    connect?: OutletWhereUniqueInput | OutletWhereUniqueInput[]
  }

  export type OAuthTokenUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type OutletUpdateManyWithoutUserNestedInput = {
    create?: XOR<OutletCreateWithoutUserInput, OutletUncheckedCreateWithoutUserInput> | OutletCreateWithoutUserInput[] | OutletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutletCreateOrConnectWithoutUserInput | OutletCreateOrConnectWithoutUserInput[]
    upsert?: OutletUpsertWithWhereUniqueWithoutUserInput | OutletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OutletCreateManyUserInputEnvelope
    set?: OutletWhereUniqueInput | OutletWhereUniqueInput[]
    disconnect?: OutletWhereUniqueInput | OutletWhereUniqueInput[]
    delete?: OutletWhereUniqueInput | OutletWhereUniqueInput[]
    connect?: OutletWhereUniqueInput | OutletWhereUniqueInput[]
    update?: OutletUpdateWithWhereUniqueWithoutUserInput | OutletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OutletUpdateManyWithWhereWithoutUserInput | OutletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OutletScalarWhereInput | OutletScalarWhereInput[]
  }

  export type OAuthTokenUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutUserInput | OAuthTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutUserInput | OAuthTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutUserInput | OAuthTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type OutletUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OutletCreateWithoutUserInput, OutletUncheckedCreateWithoutUserInput> | OutletCreateWithoutUserInput[] | OutletUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OutletCreateOrConnectWithoutUserInput | OutletCreateOrConnectWithoutUserInput[]
    upsert?: OutletUpsertWithWhereUniqueWithoutUserInput | OutletUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OutletCreateManyUserInputEnvelope
    set?: OutletWhereUniqueInput | OutletWhereUniqueInput[]
    disconnect?: OutletWhereUniqueInput | OutletWhereUniqueInput[]
    delete?: OutletWhereUniqueInput | OutletWhereUniqueInput[]
    connect?: OutletWhereUniqueInput | OutletWhereUniqueInput[]
    update?: OutletUpdateWithWhereUniqueWithoutUserInput | OutletUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OutletUpdateManyWithWhereWithoutUserInput | OutletUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OutletScalarWhereInput | OutletScalarWhereInput[]
  }

  export type OAuthTokenUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput> | OAuthTokenCreateWithoutUserInput[] | OAuthTokenUncheckedCreateWithoutUserInput[]
    connectOrCreate?: OAuthTokenCreateOrConnectWithoutUserInput | OAuthTokenCreateOrConnectWithoutUserInput[]
    upsert?: OAuthTokenUpsertWithWhereUniqueWithoutUserInput | OAuthTokenUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: OAuthTokenCreateManyUserInputEnvelope
    set?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    disconnect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    delete?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    connect?: OAuthTokenWhereUniqueInput | OAuthTokenWhereUniqueInput[]
    update?: OAuthTokenUpdateWithWhereUniqueWithoutUserInput | OAuthTokenUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: OAuthTokenUpdateManyWithWhereWithoutUserInput | OAuthTokenUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutOAuthTokenInput = {
    create?: XOR<UserCreateWithoutOAuthTokenInput, UserUncheckedCreateWithoutOAuthTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutOAuthTokenInput
    connect?: UserWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutOAuthTokenNestedInput = {
    create?: XOR<UserCreateWithoutOAuthTokenInput, UserUncheckedCreateWithoutOAuthTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutOAuthTokenInput
    upsert?: UserUpsertWithoutOAuthTokenInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOAuthTokenInput, UserUpdateWithoutOAuthTokenInput>, UserUncheckedUpdateWithoutOAuthTokenInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserCreateNestedOneWithoutOutletsInput = {
    create?: XOR<UserCreateWithoutOutletsInput, UserUncheckedCreateWithoutOutletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOutletsInput
    connect?: UserWhereUniqueInput
  }

  export type QueueCreateNestedManyWithoutOutletInput = {
    create?: XOR<QueueCreateWithoutOutletInput, QueueUncheckedCreateWithoutOutletInput> | QueueCreateWithoutOutletInput[] | QueueUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: QueueCreateOrConnectWithoutOutletInput | QueueCreateOrConnectWithoutOutletInput[]
    createMany?: QueueCreateManyOutletInputEnvelope
    connect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
  }

  export type QueueUncheckedCreateNestedManyWithoutOutletInput = {
    create?: XOR<QueueCreateWithoutOutletInput, QueueUncheckedCreateWithoutOutletInput> | QueueCreateWithoutOutletInput[] | QueueUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: QueueCreateOrConnectWithoutOutletInput | QueueCreateOrConnectWithoutOutletInput[]
    createMany?: QueueCreateManyOutletInputEnvelope
    connect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutOutletsNestedInput = {
    create?: XOR<UserCreateWithoutOutletsInput, UserUncheckedCreateWithoutOutletsInput>
    connectOrCreate?: UserCreateOrConnectWithoutOutletsInput
    upsert?: UserUpsertWithoutOutletsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutOutletsInput, UserUpdateWithoutOutletsInput>, UserUncheckedUpdateWithoutOutletsInput>
  }

  export type QueueUpdateManyWithoutOutletNestedInput = {
    create?: XOR<QueueCreateWithoutOutletInput, QueueUncheckedCreateWithoutOutletInput> | QueueCreateWithoutOutletInput[] | QueueUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: QueueCreateOrConnectWithoutOutletInput | QueueCreateOrConnectWithoutOutletInput[]
    upsert?: QueueUpsertWithWhereUniqueWithoutOutletInput | QueueUpsertWithWhereUniqueWithoutOutletInput[]
    createMany?: QueueCreateManyOutletInputEnvelope
    set?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    disconnect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    delete?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    connect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    update?: QueueUpdateWithWhereUniqueWithoutOutletInput | QueueUpdateWithWhereUniqueWithoutOutletInput[]
    updateMany?: QueueUpdateManyWithWhereWithoutOutletInput | QueueUpdateManyWithWhereWithoutOutletInput[]
    deleteMany?: QueueScalarWhereInput | QueueScalarWhereInput[]
  }

  export type QueueUncheckedUpdateManyWithoutOutletNestedInput = {
    create?: XOR<QueueCreateWithoutOutletInput, QueueUncheckedCreateWithoutOutletInput> | QueueCreateWithoutOutletInput[] | QueueUncheckedCreateWithoutOutletInput[]
    connectOrCreate?: QueueCreateOrConnectWithoutOutletInput | QueueCreateOrConnectWithoutOutletInput[]
    upsert?: QueueUpsertWithWhereUniqueWithoutOutletInput | QueueUpsertWithWhereUniqueWithoutOutletInput[]
    createMany?: QueueCreateManyOutletInputEnvelope
    set?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    disconnect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    delete?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    connect?: QueueWhereUniqueInput | QueueWhereUniqueInput[]
    update?: QueueUpdateWithWhereUniqueWithoutOutletInput | QueueUpdateWithWhereUniqueWithoutOutletInput[]
    updateMany?: QueueUpdateManyWithWhereWithoutOutletInput | QueueUpdateManyWithWhereWithoutOutletInput[]
    deleteMany?: QueueScalarWhereInput | QueueScalarWhereInput[]
  }

  export type OutletCreateNestedOneWithoutQueuesInput = {
    create?: XOR<OutletCreateWithoutQueuesInput, OutletUncheckedCreateWithoutQueuesInput>
    connectOrCreate?: OutletCreateOrConnectWithoutQueuesInput
    connect?: OutletWhereUniqueInput
  }

  export type QueueItemCreateNestedManyWithoutQueueInput = {
    create?: XOR<QueueItemCreateWithoutQueueInput, QueueItemUncheckedCreateWithoutQueueInput> | QueueItemCreateWithoutQueueInput[] | QueueItemUncheckedCreateWithoutQueueInput[]
    connectOrCreate?: QueueItemCreateOrConnectWithoutQueueInput | QueueItemCreateOrConnectWithoutQueueInput[]
    createMany?: QueueItemCreateManyQueueInputEnvelope
    connect?: QueueItemWhereUniqueInput | QueueItemWhereUniqueInput[]
  }

  export type QueueItemUncheckedCreateNestedManyWithoutQueueInput = {
    create?: XOR<QueueItemCreateWithoutQueueInput, QueueItemUncheckedCreateWithoutQueueInput> | QueueItemCreateWithoutQueueInput[] | QueueItemUncheckedCreateWithoutQueueInput[]
    connectOrCreate?: QueueItemCreateOrConnectWithoutQueueInput | QueueItemCreateOrConnectWithoutQueueInput[]
    createMany?: QueueItemCreateManyQueueInputEnvelope
    connect?: QueueItemWhereUniqueInput | QueueItemWhereUniqueInput[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type OutletUpdateOneRequiredWithoutQueuesNestedInput = {
    create?: XOR<OutletCreateWithoutQueuesInput, OutletUncheckedCreateWithoutQueuesInput>
    connectOrCreate?: OutletCreateOrConnectWithoutQueuesInput
    upsert?: OutletUpsertWithoutQueuesInput
    connect?: OutletWhereUniqueInput
    update?: XOR<XOR<OutletUpdateToOneWithWhereWithoutQueuesInput, OutletUpdateWithoutQueuesInput>, OutletUncheckedUpdateWithoutQueuesInput>
  }

  export type QueueItemUpdateManyWithoutQueueNestedInput = {
    create?: XOR<QueueItemCreateWithoutQueueInput, QueueItemUncheckedCreateWithoutQueueInput> | QueueItemCreateWithoutQueueInput[] | QueueItemUncheckedCreateWithoutQueueInput[]
    connectOrCreate?: QueueItemCreateOrConnectWithoutQueueInput | QueueItemCreateOrConnectWithoutQueueInput[]
    upsert?: QueueItemUpsertWithWhereUniqueWithoutQueueInput | QueueItemUpsertWithWhereUniqueWithoutQueueInput[]
    createMany?: QueueItemCreateManyQueueInputEnvelope
    set?: QueueItemWhereUniqueInput | QueueItemWhereUniqueInput[]
    disconnect?: QueueItemWhereUniqueInput | QueueItemWhereUniqueInput[]
    delete?: QueueItemWhereUniqueInput | QueueItemWhereUniqueInput[]
    connect?: QueueItemWhereUniqueInput | QueueItemWhereUniqueInput[]
    update?: QueueItemUpdateWithWhereUniqueWithoutQueueInput | QueueItemUpdateWithWhereUniqueWithoutQueueInput[]
    updateMany?: QueueItemUpdateManyWithWhereWithoutQueueInput | QueueItemUpdateManyWithWhereWithoutQueueInput[]
    deleteMany?: QueueItemScalarWhereInput | QueueItemScalarWhereInput[]
  }

  export type QueueItemUncheckedUpdateManyWithoutQueueNestedInput = {
    create?: XOR<QueueItemCreateWithoutQueueInput, QueueItemUncheckedCreateWithoutQueueInput> | QueueItemCreateWithoutQueueInput[] | QueueItemUncheckedCreateWithoutQueueInput[]
    connectOrCreate?: QueueItemCreateOrConnectWithoutQueueInput | QueueItemCreateOrConnectWithoutQueueInput[]
    upsert?: QueueItemUpsertWithWhereUniqueWithoutQueueInput | QueueItemUpsertWithWhereUniqueWithoutQueueInput[]
    createMany?: QueueItemCreateManyQueueInputEnvelope
    set?: QueueItemWhereUniqueInput | QueueItemWhereUniqueInput[]
    disconnect?: QueueItemWhereUniqueInput | QueueItemWhereUniqueInput[]
    delete?: QueueItemWhereUniqueInput | QueueItemWhereUniqueInput[]
    connect?: QueueItemWhereUniqueInput | QueueItemWhereUniqueInput[]
    update?: QueueItemUpdateWithWhereUniqueWithoutQueueInput | QueueItemUpdateWithWhereUniqueWithoutQueueInput[]
    updateMany?: QueueItemUpdateManyWithWhereWithoutQueueInput | QueueItemUpdateManyWithWhereWithoutQueueInput[]
    deleteMany?: QueueItemScalarWhereInput | QueueItemScalarWhereInput[]
  }

  export type QueueItemCreateNestedOneWithoutCustomerInput = {
    create?: XOR<QueueItemCreateWithoutCustomerInput, QueueItemUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: QueueItemCreateOrConnectWithoutCustomerInput
    connect?: QueueItemWhereUniqueInput
  }

  export type QueueItemUncheckedCreateNestedOneWithoutCustomerInput = {
    create?: XOR<QueueItemCreateWithoutCustomerInput, QueueItemUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: QueueItemCreateOrConnectWithoutCustomerInput
    connect?: QueueItemWhereUniqueInput
  }

  export type QueueItemUpdateOneWithoutCustomerNestedInput = {
    create?: XOR<QueueItemCreateWithoutCustomerInput, QueueItemUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: QueueItemCreateOrConnectWithoutCustomerInput
    upsert?: QueueItemUpsertWithoutCustomerInput
    disconnect?: QueueItemWhereInput | boolean
    delete?: QueueItemWhereInput | boolean
    connect?: QueueItemWhereUniqueInput
    update?: XOR<XOR<QueueItemUpdateToOneWithWhereWithoutCustomerInput, QueueItemUpdateWithoutCustomerInput>, QueueItemUncheckedUpdateWithoutCustomerInput>
  }

  export type QueueItemUncheckedUpdateOneWithoutCustomerNestedInput = {
    create?: XOR<QueueItemCreateWithoutCustomerInput, QueueItemUncheckedCreateWithoutCustomerInput>
    connectOrCreate?: QueueItemCreateOrConnectWithoutCustomerInput
    upsert?: QueueItemUpsertWithoutCustomerInput
    disconnect?: QueueItemWhereInput | boolean
    delete?: QueueItemWhereInput | boolean
    connect?: QueueItemWhereUniqueInput
    update?: XOR<XOR<QueueItemUpdateToOneWithWhereWithoutCustomerInput, QueueItemUpdateWithoutCustomerInput>, QueueItemUncheckedUpdateWithoutCustomerInput>
  }

  export type QueueCreateNestedOneWithoutQueueItemsInput = {
    create?: XOR<QueueCreateWithoutQueueItemsInput, QueueUncheckedCreateWithoutQueueItemsInput>
    connectOrCreate?: QueueCreateOrConnectWithoutQueueItemsInput
    connect?: QueueWhereUniqueInput
  }

  export type CustomerCreateNestedOneWithoutQueueItemsInput = {
    create?: XOR<CustomerCreateWithoutQueueItemsInput, CustomerUncheckedCreateWithoutQueueItemsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutQueueItemsInput
    connect?: CustomerWhereUniqueInput
  }

  export type QueueUpdateOneRequiredWithoutQueueItemsNestedInput = {
    create?: XOR<QueueCreateWithoutQueueItemsInput, QueueUncheckedCreateWithoutQueueItemsInput>
    connectOrCreate?: QueueCreateOrConnectWithoutQueueItemsInput
    upsert?: QueueUpsertWithoutQueueItemsInput
    connect?: QueueWhereUniqueInput
    update?: XOR<XOR<QueueUpdateToOneWithWhereWithoutQueueItemsInput, QueueUpdateWithoutQueueItemsInput>, QueueUncheckedUpdateWithoutQueueItemsInput>
  }

  export type CustomerUpdateOneWithoutQueueItemsNestedInput = {
    create?: XOR<CustomerCreateWithoutQueueItemsInput, CustomerUncheckedCreateWithoutQueueItemsInput>
    connectOrCreate?: CustomerCreateOrConnectWithoutQueueItemsInput
    upsert?: CustomerUpsertWithoutQueueItemsInput
    disconnect?: CustomerWhereInput | boolean
    delete?: CustomerWhereInput | boolean
    connect?: CustomerWhereUniqueInput
    update?: XOR<XOR<CustomerUpdateToOneWithWhereWithoutQueueItemsInput, CustomerUpdateWithoutQueueItemsInput>, CustomerUncheckedUpdateWithoutQueueItemsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type OutletCreateWithoutUserInput = {
    name?: string | null
    queues?: QueueCreateNestedManyWithoutOutletInput
  }

  export type OutletUncheckedCreateWithoutUserInput = {
    id?: number
    name?: string | null
    queues?: QueueUncheckedCreateNestedManyWithoutOutletInput
  }

  export type OutletCreateOrConnectWithoutUserInput = {
    where: OutletWhereUniqueInput
    create: XOR<OutletCreateWithoutUserInput, OutletUncheckedCreateWithoutUserInput>
  }

  export type OutletCreateManyUserInputEnvelope = {
    data: OutletCreateManyUserInput | OutletCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OAuthTokenCreateWithoutUserInput = {
    provider: string
    accessToken: string
    refreshToken?: string | null
  }

  export type OAuthTokenUncheckedCreateWithoutUserInput = {
    id?: number
    provider: string
    accessToken: string
    refreshToken?: string | null
  }

  export type OAuthTokenCreateOrConnectWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    create: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthTokenCreateManyUserInputEnvelope = {
    data: OAuthTokenCreateManyUserInput | OAuthTokenCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type OutletUpsertWithWhereUniqueWithoutUserInput = {
    where: OutletWhereUniqueInput
    update: XOR<OutletUpdateWithoutUserInput, OutletUncheckedUpdateWithoutUserInput>
    create: XOR<OutletCreateWithoutUserInput, OutletUncheckedCreateWithoutUserInput>
  }

  export type OutletUpdateWithWhereUniqueWithoutUserInput = {
    where: OutletWhereUniqueInput
    data: XOR<OutletUpdateWithoutUserInput, OutletUncheckedUpdateWithoutUserInput>
  }

  export type OutletUpdateManyWithWhereWithoutUserInput = {
    where: OutletScalarWhereInput
    data: XOR<OutletUpdateManyMutationInput, OutletUncheckedUpdateManyWithoutUserInput>
  }

  export type OutletScalarWhereInput = {
    AND?: OutletScalarWhereInput | OutletScalarWhereInput[]
    OR?: OutletScalarWhereInput[]
    NOT?: OutletScalarWhereInput | OutletScalarWhereInput[]
    id?: IntFilter<"Outlet"> | number
    name?: StringNullableFilter<"Outlet"> | string | null
    userId?: StringFilter<"Outlet"> | string
  }

  export type OAuthTokenUpsertWithWhereUniqueWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    update: XOR<OAuthTokenUpdateWithoutUserInput, OAuthTokenUncheckedUpdateWithoutUserInput>
    create: XOR<OAuthTokenCreateWithoutUserInput, OAuthTokenUncheckedCreateWithoutUserInput>
  }

  export type OAuthTokenUpdateWithWhereUniqueWithoutUserInput = {
    where: OAuthTokenWhereUniqueInput
    data: XOR<OAuthTokenUpdateWithoutUserInput, OAuthTokenUncheckedUpdateWithoutUserInput>
  }

  export type OAuthTokenUpdateManyWithWhereWithoutUserInput = {
    where: OAuthTokenScalarWhereInput
    data: XOR<OAuthTokenUpdateManyMutationInput, OAuthTokenUncheckedUpdateManyWithoutUserInput>
  }

  export type OAuthTokenScalarWhereInput = {
    AND?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
    OR?: OAuthTokenScalarWhereInput[]
    NOT?: OAuthTokenScalarWhereInput | OAuthTokenScalarWhereInput[]
    id?: IntFilter<"OAuthToken"> | number
    provider?: StringFilter<"OAuthToken"> | string
    accessToken?: StringFilter<"OAuthToken"> | string
    refreshToken?: StringNullableFilter<"OAuthToken"> | string | null
    userId?: StringFilter<"OAuthToken"> | string
  }

  export type UserCreateWithoutOAuthTokenInput = {
    id?: string
    createdAt?: Date | string
    name?: string | null
    email: string
    password?: string | null
    hasPassword?: boolean
    outlets?: OutletCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOAuthTokenInput = {
    id?: string
    createdAt?: Date | string
    name?: string | null
    email: string
    password?: string | null
    hasPassword?: boolean
    outlets?: OutletUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOAuthTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOAuthTokenInput, UserUncheckedCreateWithoutOAuthTokenInput>
  }

  export type UserUpsertWithoutOAuthTokenInput = {
    update: XOR<UserUpdateWithoutOAuthTokenInput, UserUncheckedUpdateWithoutOAuthTokenInput>
    create: XOR<UserCreateWithoutOAuthTokenInput, UserUncheckedCreateWithoutOAuthTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOAuthTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOAuthTokenInput, UserUncheckedUpdateWithoutOAuthTokenInput>
  }

  export type UserUpdateWithoutOAuthTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    outlets?: OutletUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOAuthTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    outlets?: OutletUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutOutletsInput = {
    id?: string
    createdAt?: Date | string
    name?: string | null
    email: string
    password?: string | null
    hasPassword?: boolean
    OAuthToken?: OAuthTokenCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutOutletsInput = {
    id?: string
    createdAt?: Date | string
    name?: string | null
    email: string
    password?: string | null
    hasPassword?: boolean
    OAuthToken?: OAuthTokenUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutOutletsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutOutletsInput, UserUncheckedCreateWithoutOutletsInput>
  }

  export type QueueCreateWithoutOutletInput = {
    startTime?: Date | string
    endTime?: Date | string | null
    active?: boolean
    name?: string | null
    queueItems?: QueueItemCreateNestedManyWithoutQueueInput
  }

  export type QueueUncheckedCreateWithoutOutletInput = {
    id?: number
    startTime?: Date | string
    endTime?: Date | string | null
    active?: boolean
    name?: string | null
    queueItems?: QueueItemUncheckedCreateNestedManyWithoutQueueInput
  }

  export type QueueCreateOrConnectWithoutOutletInput = {
    where: QueueWhereUniqueInput
    create: XOR<QueueCreateWithoutOutletInput, QueueUncheckedCreateWithoutOutletInput>
  }

  export type QueueCreateManyOutletInputEnvelope = {
    data: QueueCreateManyOutletInput | QueueCreateManyOutletInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutOutletsInput = {
    update: XOR<UserUpdateWithoutOutletsInput, UserUncheckedUpdateWithoutOutletsInput>
    create: XOR<UserCreateWithoutOutletsInput, UserUncheckedCreateWithoutOutletsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutOutletsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutOutletsInput, UserUncheckedUpdateWithoutOutletsInput>
  }

  export type UserUpdateWithoutOutletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    OAuthToken?: OAuthTokenUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutOutletsInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    email?: StringFieldUpdateOperationsInput | string
    password?: NullableStringFieldUpdateOperationsInput | string | null
    hasPassword?: BoolFieldUpdateOperationsInput | boolean
    OAuthToken?: OAuthTokenUncheckedUpdateManyWithoutUserNestedInput
  }

  export type QueueUpsertWithWhereUniqueWithoutOutletInput = {
    where: QueueWhereUniqueInput
    update: XOR<QueueUpdateWithoutOutletInput, QueueUncheckedUpdateWithoutOutletInput>
    create: XOR<QueueCreateWithoutOutletInput, QueueUncheckedCreateWithoutOutletInput>
  }

  export type QueueUpdateWithWhereUniqueWithoutOutletInput = {
    where: QueueWhereUniqueInput
    data: XOR<QueueUpdateWithoutOutletInput, QueueUncheckedUpdateWithoutOutletInput>
  }

  export type QueueUpdateManyWithWhereWithoutOutletInput = {
    where: QueueScalarWhereInput
    data: XOR<QueueUpdateManyMutationInput, QueueUncheckedUpdateManyWithoutOutletInput>
  }

  export type QueueScalarWhereInput = {
    AND?: QueueScalarWhereInput | QueueScalarWhereInput[]
    OR?: QueueScalarWhereInput[]
    NOT?: QueueScalarWhereInput | QueueScalarWhereInput[]
    id?: IntFilter<"Queue"> | number
    outletId?: IntFilter<"Queue"> | number
    startTime?: DateTimeFilter<"Queue"> | Date | string
    endTime?: DateTimeNullableFilter<"Queue"> | Date | string | null
    active?: BoolFilter<"Queue"> | boolean
    name?: StringNullableFilter<"Queue"> | string | null
  }

  export type OutletCreateWithoutQueuesInput = {
    name?: string | null
    user: UserCreateNestedOneWithoutOutletsInput
  }

  export type OutletUncheckedCreateWithoutQueuesInput = {
    id?: number
    name?: string | null
    userId: string
  }

  export type OutletCreateOrConnectWithoutQueuesInput = {
    where: OutletWhereUniqueInput
    create: XOR<OutletCreateWithoutQueuesInput, OutletUncheckedCreateWithoutQueuesInput>
  }

  export type QueueItemCreateWithoutQueueInput = {
    createdAt?: Date | string
    pax: number
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
    customer?: CustomerCreateNestedOneWithoutQueueItemsInput
  }

  export type QueueItemUncheckedCreateWithoutQueueInput = {
    id?: number
    customerId?: string | null
    createdAt?: Date | string
    pax: number
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
  }

  export type QueueItemCreateOrConnectWithoutQueueInput = {
    where: QueueItemWhereUniqueInput
    create: XOR<QueueItemCreateWithoutQueueInput, QueueItemUncheckedCreateWithoutQueueInput>
  }

  export type QueueItemCreateManyQueueInputEnvelope = {
    data: QueueItemCreateManyQueueInput | QueueItemCreateManyQueueInput[]
    skipDuplicates?: boolean
  }

  export type OutletUpsertWithoutQueuesInput = {
    update: XOR<OutletUpdateWithoutQueuesInput, OutletUncheckedUpdateWithoutQueuesInput>
    create: XOR<OutletCreateWithoutQueuesInput, OutletUncheckedCreateWithoutQueuesInput>
    where?: OutletWhereInput
  }

  export type OutletUpdateToOneWithWhereWithoutQueuesInput = {
    where?: OutletWhereInput
    data: XOR<OutletUpdateWithoutQueuesInput, OutletUncheckedUpdateWithoutQueuesInput>
  }

  export type OutletUpdateWithoutQueuesInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    user?: UserUpdateOneRequiredWithoutOutletsNestedInput
  }

  export type OutletUncheckedUpdateWithoutQueuesInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type QueueItemUpsertWithWhereUniqueWithoutQueueInput = {
    where: QueueItemWhereUniqueInput
    update: XOR<QueueItemUpdateWithoutQueueInput, QueueItemUncheckedUpdateWithoutQueueInput>
    create: XOR<QueueItemCreateWithoutQueueInput, QueueItemUncheckedCreateWithoutQueueInput>
  }

  export type QueueItemUpdateWithWhereUniqueWithoutQueueInput = {
    where: QueueItemWhereUniqueInput
    data: XOR<QueueItemUpdateWithoutQueueInput, QueueItemUncheckedUpdateWithoutQueueInput>
  }

  export type QueueItemUpdateManyWithWhereWithoutQueueInput = {
    where: QueueItemScalarWhereInput
    data: XOR<QueueItemUpdateManyMutationInput, QueueItemUncheckedUpdateManyWithoutQueueInput>
  }

  export type QueueItemScalarWhereInput = {
    AND?: QueueItemScalarWhereInput | QueueItemScalarWhereInput[]
    OR?: QueueItemScalarWhereInput[]
    NOT?: QueueItemScalarWhereInput | QueueItemScalarWhereInput[]
    id?: IntFilter<"QueueItem"> | number
    queueId?: IntFilter<"QueueItem"> | number
    customerId?: StringNullableFilter<"QueueItem"> | string | null
    createdAt?: DateTimeFilter<"QueueItem"> | Date | string
    pax?: IntFilter<"QueueItem"> | number
    called?: BoolFilter<"QueueItem"> | boolean
    seated?: BoolFilter<"QueueItem"> | boolean
    quit?: BoolFilter<"QueueItem"> | boolean
    active?: BoolFilter<"QueueItem"> | boolean
  }

  export type QueueItemCreateWithoutCustomerInput = {
    createdAt?: Date | string
    pax: number
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
    queue: QueueCreateNestedOneWithoutQueueItemsInput
  }

  export type QueueItemUncheckedCreateWithoutCustomerInput = {
    id?: number
    queueId: number
    createdAt?: Date | string
    pax: number
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
  }

  export type QueueItemCreateOrConnectWithoutCustomerInput = {
    where: QueueItemWhereUniqueInput
    create: XOR<QueueItemCreateWithoutCustomerInput, QueueItemUncheckedCreateWithoutCustomerInput>
  }

  export type QueueItemUpsertWithoutCustomerInput = {
    update: XOR<QueueItemUpdateWithoutCustomerInput, QueueItemUncheckedUpdateWithoutCustomerInput>
    create: XOR<QueueItemCreateWithoutCustomerInput, QueueItemUncheckedCreateWithoutCustomerInput>
    where?: QueueItemWhereInput
  }

  export type QueueItemUpdateToOneWithWhereWithoutCustomerInput = {
    where?: QueueItemWhereInput
    data: XOR<QueueItemUpdateWithoutCustomerInput, QueueItemUncheckedUpdateWithoutCustomerInput>
  }

  export type QueueItemUpdateWithoutCustomerInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pax?: IntFieldUpdateOperationsInput | number
    called?: BoolFieldUpdateOperationsInput | boolean
    seated?: BoolFieldUpdateOperationsInput | boolean
    quit?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    queue?: QueueUpdateOneRequiredWithoutQueueItemsNestedInput
  }

  export type QueueItemUncheckedUpdateWithoutCustomerInput = {
    id?: IntFieldUpdateOperationsInput | number
    queueId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pax?: IntFieldUpdateOperationsInput | number
    called?: BoolFieldUpdateOperationsInput | boolean
    seated?: BoolFieldUpdateOperationsInput | boolean
    quit?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QueueCreateWithoutQueueItemsInput = {
    startTime?: Date | string
    endTime?: Date | string | null
    active?: boolean
    name?: string | null
    outlet: OutletCreateNestedOneWithoutQueuesInput
  }

  export type QueueUncheckedCreateWithoutQueueItemsInput = {
    id?: number
    outletId: number
    startTime?: Date | string
    endTime?: Date | string | null
    active?: boolean
    name?: string | null
  }

  export type QueueCreateOrConnectWithoutQueueItemsInput = {
    where: QueueWhereUniqueInput
    create: XOR<QueueCreateWithoutQueueItemsInput, QueueUncheckedCreateWithoutQueueItemsInput>
  }

  export type CustomerCreateWithoutQueueItemsInput = {
    id?: string
    name?: string | null
    number?: string | null
    VIP?: boolean
  }

  export type CustomerUncheckedCreateWithoutQueueItemsInput = {
    id?: string
    name?: string | null
    number?: string | null
    VIP?: boolean
  }

  export type CustomerCreateOrConnectWithoutQueueItemsInput = {
    where: CustomerWhereUniqueInput
    create: XOR<CustomerCreateWithoutQueueItemsInput, CustomerUncheckedCreateWithoutQueueItemsInput>
  }

  export type QueueUpsertWithoutQueueItemsInput = {
    update: XOR<QueueUpdateWithoutQueueItemsInput, QueueUncheckedUpdateWithoutQueueItemsInput>
    create: XOR<QueueCreateWithoutQueueItemsInput, QueueUncheckedCreateWithoutQueueItemsInput>
    where?: QueueWhereInput
  }

  export type QueueUpdateToOneWithWhereWithoutQueueItemsInput = {
    where?: QueueWhereInput
    data: XOR<QueueUpdateWithoutQueueItemsInput, QueueUncheckedUpdateWithoutQueueItemsInput>
  }

  export type QueueUpdateWithoutQueueItemsInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    outlet?: OutletUpdateOneRequiredWithoutQueuesNestedInput
  }

  export type QueueUncheckedUpdateWithoutQueueItemsInput = {
    id?: IntFieldUpdateOperationsInput | number
    outletId?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CustomerUpsertWithoutQueueItemsInput = {
    update: XOR<CustomerUpdateWithoutQueueItemsInput, CustomerUncheckedUpdateWithoutQueueItemsInput>
    create: XOR<CustomerCreateWithoutQueueItemsInput, CustomerUncheckedCreateWithoutQueueItemsInput>
    where?: CustomerWhereInput
  }

  export type CustomerUpdateToOneWithWhereWithoutQueueItemsInput = {
    where?: CustomerWhereInput
    data: XOR<CustomerUpdateWithoutQueueItemsInput, CustomerUncheckedUpdateWithoutQueueItemsInput>
  }

  export type CustomerUpdateWithoutQueueItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    VIP?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CustomerUncheckedUpdateWithoutQueueItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: NullableStringFieldUpdateOperationsInput | string | null
    VIP?: BoolFieldUpdateOperationsInput | boolean
  }

  export type OutletCreateManyUserInput = {
    id?: number
    name?: string | null
  }

  export type OAuthTokenCreateManyUserInput = {
    id?: number
    provider: string
    accessToken: string
    refreshToken?: string | null
  }

  export type OutletUpdateWithoutUserInput = {
    name?: NullableStringFieldUpdateOperationsInput | string | null
    queues?: QueueUpdateManyWithoutOutletNestedInput
  }

  export type OutletUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
    queues?: QueueUncheckedUpdateManyWithoutOutletNestedInput
  }

  export type OutletUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OAuthTokenUpdateWithoutUserInput = {
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OAuthTokenUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type OAuthTokenUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    provider?: StringFieldUpdateOperationsInput | string
    accessToken?: StringFieldUpdateOperationsInput | string
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QueueCreateManyOutletInput = {
    id?: number
    startTime?: Date | string
    endTime?: Date | string | null
    active?: boolean
    name?: string | null
  }

  export type QueueUpdateWithoutOutletInput = {
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    queueItems?: QueueItemUpdateManyWithoutQueueNestedInput
  }

  export type QueueUncheckedUpdateWithoutOutletInput = {
    id?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
    queueItems?: QueueItemUncheckedUpdateManyWithoutQueueNestedInput
  }

  export type QueueUncheckedUpdateManyWithoutOutletInput = {
    id?: IntFieldUpdateOperationsInput | number
    startTime?: DateTimeFieldUpdateOperationsInput | Date | string
    endTime?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    active?: BoolFieldUpdateOperationsInput | boolean
    name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type QueueItemCreateManyQueueInput = {
    id?: number
    customerId?: string | null
    createdAt?: Date | string
    pax: number
    called?: boolean
    seated?: boolean
    quit?: boolean
    active?: boolean
  }

  export type QueueItemUpdateWithoutQueueInput = {
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pax?: IntFieldUpdateOperationsInput | number
    called?: BoolFieldUpdateOperationsInput | boolean
    seated?: BoolFieldUpdateOperationsInput | boolean
    quit?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
    customer?: CustomerUpdateOneWithoutQueueItemsNestedInput
  }

  export type QueueItemUncheckedUpdateWithoutQueueInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pax?: IntFieldUpdateOperationsInput | number
    called?: BoolFieldUpdateOperationsInput | boolean
    seated?: BoolFieldUpdateOperationsInput | boolean
    quit?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
  }

  export type QueueItemUncheckedUpdateManyWithoutQueueInput = {
    id?: IntFieldUpdateOperationsInput | number
    customerId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    pax?: IntFieldUpdateOperationsInput | number
    called?: BoolFieldUpdateOperationsInput | boolean
    seated?: BoolFieldUpdateOperationsInput | boolean
    quit?: BoolFieldUpdateOperationsInput | boolean
    active?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}