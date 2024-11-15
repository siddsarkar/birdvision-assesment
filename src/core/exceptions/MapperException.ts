class BaseException extends Error {
  constructor(message: string | undefined) {
    super(message);
  }
}

class MapperException extends BaseException {
  constructor(message: unknown) {
    if (message instanceof Error) {
      super(message.message);
    } else {
      super(message as string);
    }
  }

  override toString(): string {
    return `MapperException: ${this.message}`;
  }
}

export default MapperException;
