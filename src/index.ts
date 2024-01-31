type Form<T extends string | number> = {
  value: T;
};
type TextForm = Form<string>;
type NumberForm = Form<number>;

type Check<T> = T extends string ? boolean : number;
type StringValue = Check<string>;
type NumberValue = Check<number>;
type Result = Check<string | number>;

// never
type ExcludeFalsy<T> = T extends false | null | undefined ? never : T;
type NonFalsyString = ExcludeFalsy<string | null | undefined | false>;

// infer
type ExtractType<T> = T extends Array<infer U> ? U : never;
type ArrayElementType = ExtractType<string[]>;

// recursive
type TreeNode<T> = {
  value: T;
  left?: TreeNode<T>;
  right?: TreeNode<T>;
};

type LeafNode<T> = TreeNode<T> extends TreeNode<infer U> ? U : never;
type StringLeafNode = LeafNode<TreeNode<string>>;
type NumberLeafNode = LeafNode<TreeNode<number>>;
type NeverLeafNode = LeafNode<TreeNode<never>>;
type UndefinedLeafNode = LeafNode<TreeNode<undefined>>;
type NullLeafNode = LeafNode<TreeNode<null>>;
type BooleanLeafNode = LeafNode<TreeNode<boolean>>;
type ObjectLeafNode = LeafNode<TreeNode<object>>;
type ArrayLeafNode = LeafNode<TreeNode<Array<string>>>;

type Key<T> = T[keyof T];

// Pick
type Foo = {
  id: string;
  title: string;
  completed: boolean;
};

type Pick<T, K extends string> = {
  [P in K]: T;
};

type FooPicked = Pick<Foo, "title" | "completed">;

type Omit<T, K extends keyof T> = {
  [P in Exclude<keyof T, K>]: T[P];
};

type FooOmit = Omit<Foo, "completed">;

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type FooPartial = Partial<Foo>;

type Required<T> = {
  [P in keyof T]-?: T[P];
};

type FooRequired = Required<Foo>;

type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type FooReadonly = Readonly<Foo>;

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type FooRecord = Record<"foo" | "bar", Foo>;

type Exclude<T, U> = T extends U ? never : T;

type FooExclude = Exclude<string | number | boolean, boolean>;

type Extract<T, U> = T extends U ? T : never;

type FooExtract = Extract<string | number | boolean, boolean>;

type NonNullable<T> = T extends null | undefined ? never : T;

type FooNonNullable = NonNullable<string | number | null | undefined>;

type Parameters<T extends (...args: any) => any> = T extends (
  ...args: infer P
) => any
  ? P
  : never;

type FooParameters = Parameters<(foo: string, bar: number) => void>;

type ConstructorParameters<T extends new (...args: any) => any> =
  T extends new (...args: infer P) => any ? P : never;

type FooConstructorParameters = ConstructorParameters<
  new (foo: string, bar: number) => void
>;

type ReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer R
  ? R
  : never;

type FooReturnType = ReturnType<(foo: string, bar: number) => boolean>;

type InstanceType<T extends new (...args: any) => any> = T extends new (
  ...args: any
) => infer R
  ? R
  : never;

type FooInstanceType = InstanceType<new (foo: string, bar: number) => boolean>;

type ThisParameterType<T> = T extends (this: infer U, ...args: any) => any
  ? U
  : unknown;

type FooThisParameterType = ThisParameterType<
  (this: string, foo: string, bar: number) => boolean
>;

type OmitThisParameter<T> = unknown extends ThisParameterType<T>
  ? T
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T;

type FooOmitThisParameter = OmitThisParameter<
  (this: string, foo: string, bar: number) => boolean
>;

type ThisType<T> = unknown extends ThisParameterType<T> ? unknown : T;

type FooThisType = ThisType<
  (this: string, foo: string, bar: number) => boolean
>;

type UnionToIntersection<T> = (T extends any ? (x: T) => any : never) extends (
  x: infer R
) => any
  ? R
  : never;

type FooUnionToIntersection = UnionToIntersection<string | number | boolean>;

type InferTuple<T> = T extends (infer U)[] ? U : never;

type FooInferTuple = InferTuple<string[]>;

type InferObject<T> = T extends { [k: string]: infer U } ? U : never;

type FooInferObject = InferObject<{ foo: string; bar: number }>;

type InferObjectOrTuple<T> = T extends (infer U)[]
  ? U
  : T extends object
  ? { [k in keyof T]: T[k] }
  : never;

type FooInferObjectOrTuple = InferObjectOrTuple<string[]>;

type InferArray<T> = T extends (infer U)[] ? U : never;

type FooInferArray = InferArray<string[]>;

type InferTupleOrArray<T> = T extends (infer U)[]
  ? U
  : T extends Array<infer U>
  ? U
  : never;

type FooInferTupleOrArray = InferTupleOrArray<string[]>;

type InferArrayOrObject<T> = T extends (infer U)[]
  ? U
  : T extends object
  ? { [k in keyof T]: T[k] }
  : never;

type FooInferArrayOrObject = InferArrayOrObject<string[]>;

type InferArrayOrTuple<T> = T extends (infer U)[]
  ? U
  : T extends Array<infer U>
  ? U
  : never;

type FooInferArrayOrTuple = InferArrayOrTuple<string[]>;

type InferObjectOrArray<T> = T extends object
  ? { [k in keyof T]: T[k] }
  : T extends (infer U)[]
  ? U
  : never;

type FooInferObjectOrArray = InferObjectOrArray<string[]>;

type InferObjectOrTupleOrArray<T> = T extends object
  ? { [k in keyof T]: T[k] }
  : T extends (infer U)[]
  ? U
  : T extends Array<infer U>
  ? U
  : never;

type FooInferObjectOrTupleOrArray = InferObjectOrTupleOrArray<string[]>;

type InferFunctionOrConstructor<T> = T extends new (...args: infer A) => infer R
  ? (...args: A) => R
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : never;

type FooInferFunctionOrConstructor = InferFunctionOrConstructor<
  (foo: string, bar: number) => boolean
>;

type InferFunctionOrConstructorOrAsync<T> = T extends new (
  ...args: infer A
) => infer R
  ? (...args: A) => R | Promise<R>
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R | Promise<R>
  : never;

type FooInferFunctionOrConstructorOrAsync = InferFunctionOrConstructorOrAsync<
  (foo: string, bar: number) => boolean
>;

type InferFunctionOrConstructorOrAsyncOrGenerator<T> = T extends new (
  ...args: infer A
) => infer R
  ? (...args: A) => R | Promise<R> | Generator<R>
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R | Promise<R> | Generator<R>
  : never;

type FooInferFunctionOrConstructorOrAsyncOrGenerator =
  InferFunctionOrConstructorOrAsyncOrGenerator<
    (foo: string, bar: number) => boolean
  >;

type InferFunctionOrConstructorOrAsyncOrGeneratorOrIterable<T> = T extends new (
  ...args: infer A
) => infer R
  ? (...args: A) => R | Promise<R> | Generator<R> | Iterable<R>
  : T extends (...args: infer A) => infer R
  ? (...args: A) => R | Promise<R> | Generator<R> | Iterable<R>
  : never;

type FooInferFunctionOrConstructorOrAsyncOrGeneratorOrIterable =
  InferFunctionOrConstructorOrAsyncOrGeneratorOrIterable<
    (foo: string, bar: number) => boolean
  >;

type InferFunctionOrConstructorOrAsyncOrGeneratorOrIterableOrIterator<T> =
  T extends new (...args: infer A) => infer R
    ? (...args: A) => R | Promise<R> | Generator<R> | Iterable<R> | Iterator<R>
    : T extends (...args: infer A) => infer R
    ? (...args: A) => R | Promise<R> | Generator<R> | Iterable<R> | Iterator<R>
    : never;

type FooInferFunctionOrConstructorOrAsyncOrGeneratorOrIterableOrIterator =
  InferFunctionOrConstructorOrAsyncOrGeneratorOrIterableOrIterator<
    (foo: string, bar: number) => boolean
  >;

type InferFunctionOrConstructorOrAsyncOrGeneratorOrIterableOrIteratorOrAsyncIterator<
  T extends new (...args: any) => any
> = T extends new (...args: infer A) => infer R
  ? (
      ...args: A
    ) =>
      | R
      | Promise<R>
      | Generator<R>
      | Iterable<R>
      | Iterator<R>
      | AsyncIterator<R>
  : T extends (...args: infer A) => infer R
  ? (
      ...args: A
    ) =>
      | R
      | Promise<R>
      | Generator<R>
      | Iterable<R>
      | Iterator<R>
      | AsyncIterator<R>
  : never;

type InferFunction<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : never;

type FooInferFunction = InferFunction<(foo: string, bar: number) => boolean>;

type InferPromise<T> = T extends Promise<infer U> ? U : never;

type FooInferPromise = InferPromise<Promise<string>>;

type InferAsyncIterable<T> = T extends AsyncIterable<infer U> ? U : never;

type FooInferAsyncIterable = InferAsyncIterable<AsyncIterable<string>>;

type InferIterable<T> = T extends Iterable<infer U> ? U : never;

type FooInferIterable = InferIterable<Iterable<string>>;

type InferGenerator<T> = T extends Generator<infer U> ? U : never;

type FooInferGenerator = InferGenerator<Generator<string>>;

type InferIterator<T> = T extends Iterator<infer U> ? U : never;

type FooInferIterator = InferIterator<Iterator<string>>;

type InferIteratorResult<T> = T extends Iterator<any, infer U> ? U : never;

type FooInferIteratorResult = InferIteratorResult<Iterator<string>>;

type InferAsyncIterator<T> = T extends AsyncIterator<infer U> ? U : never;

type FooInferAsyncIterator = InferAsyncIterator<AsyncIterator<string>>;

type InferAsyncIteratorResult<T> = T extends AsyncIterator<any, infer U>
  ? U
  : never;

type FooInferAsyncIteratorResult = InferAsyncIteratorResult<
  AsyncIterator<string>
>;

type InferAsyncGenerator<T> = T extends AsyncGenerator<infer U> ? U : never;

type FooInferAsyncGenerator = InferAsyncGenerator<AsyncGenerator<string>>;

type InferAsyncGeneratorResult<T> = T extends AsyncGenerator<any, infer U>
  ? U
  : never;

type FooInferAsyncGeneratorResult = InferAsyncGeneratorResult<
  AsyncGenerator<string>
>;

type InferType<T> = T extends infer U ? U : never;

type FooInferType = InferType<string>;
