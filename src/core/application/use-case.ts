/** Base contract for application use cases (Command pattern). */
export interface UseCase<TInput, TOutput> {
  execute(input: TInput): Promise<TOutput>;
}
