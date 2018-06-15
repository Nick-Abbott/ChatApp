export class Exception extends Error {
  private CODE: number;
  private NAMESPACE: string;

  constructor(name: string, message: string, code: number, namespace: string) {
    super(message);
    this.name = name;
    this.CODE = code;
    this.NAMESPACE = namespace;
  }

  public get code(): number {
    return this.CODE;
  }

  public get namespace(): string {
    return this.NAMESPACE;
  }

}
