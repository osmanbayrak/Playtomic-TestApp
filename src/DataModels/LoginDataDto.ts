export interface loginInputDataDto {
    email: string;
    password: string;
};

export interface userInfoDto {
    displayName: string;
    email: string;
    expiresIn: string;
    idToken: string;
    kind: string;
    localId: string;
    refreshToken: string;
    registered: boolean;

}