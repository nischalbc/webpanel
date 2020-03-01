export interface UserTypeJson {
  label: string;
  value: string;
  allowedIps?: number;
}

export class UserTypeModel implements UserTypeJson {
    label: string;
    value: string;
    allowedIps?: number;

    constructor(source: UserTypeJson) {
        this.label = source.label;
        this.value = source.value;
        this.allowedIps = source.allowedIps;
    }
}



