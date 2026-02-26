import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'يجب إدخال بريد إلكتروني صالح' })
    @IsNotEmpty({ message: 'البريد الإلكتروني مطلوب' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'كلمة المرور مطلوبة' })
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }, { message: 'كلمة المرور يجب أن تتضمن 8 أحرف على الأقل، حرف كبير، حرف صغير، رقم، ورمز' })
    password: string;

    @IsString()
    @IsNotEmpty({ message: 'الاسم مطلوب' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'نوع الحساب مطلوب' })
    role: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    companyName?: string;

    @IsString()
    @IsOptional()
    website?: string;

    @IsString()
    @IsOptional()
    socialLinks?: string;

    @IsString()
    @IsOptional()
    status?: string;
}
