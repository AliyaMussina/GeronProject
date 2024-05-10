import { ApiProperty } from "@nestjs/swagger";


export class GetParticipantsResponse{
    //другие пользователи авторизованные
    @ApiProperty({example:'Виктор'})
    firstName:string = '';

    @ApiProperty({example:'Геронов'})
    lastName:string = '';

    @ApiProperty({example:'student1'})
    username:string = '';



}