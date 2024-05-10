import { ApiProperty } from "@nestjs/swagger";

export class GetMyProfileResponse {
    //настройка айпи(пример и под каким ключем)
    @ApiProperty ({example:'Виктор'})
    firstName: string = '';

    @ApiProperty ({example:'Геронов'})
    lastName: string = '';

    @ApiProperty ({example:'example@test.com'})
    email: string = '';

    @ApiProperty ({example:'student1'})
    username: string = '';


}
