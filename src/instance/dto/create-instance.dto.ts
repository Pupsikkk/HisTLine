export class createInstanceDto {
  readonly name: string;
  readonly description?: string;
  readonly fromYear: number;
  readonly toYear: number;
  readonly img?: string;
  readonly type: string;
  readonly subtypes: string[];
  readonly links?: string[];
}
