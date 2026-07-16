export interface ProfileProps {
  id: string;
  fullName: string;
  displayName?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Account holder profile — extends Supabase Auth user with app-specific fields.
 */
export class Profile {
  readonly id: string;
  readonly fullName: string;
  readonly displayName?: string;
  readonly phone?: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;

  private constructor(props: ProfileProps) {
    this.id = props.id;
    this.fullName = props.fullName;
    this.displayName = props.displayName;
    this.phone = props.phone;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }

  static reconstitute(props: ProfileProps): Profile {
    return new Profile(props);
  }
}
