export interface LoginUserDto {
    username?: string;
    password?: string;
}

export interface TokenDto {
    token?: string;
    expiresIn?: number;
}

export interface UserResponseDto {
    username?: string;
    role?: string;
}