import { ApiProperty } from "@nestjs/swagger";

export class GetProjectFindAllResponse{
    @ApiProperty({example: '5dccscjnc-c-cc-cscsaccbvm'})
    id: string;

    @ApiProperty({example: 'Название проекта'})
    name: string;
}