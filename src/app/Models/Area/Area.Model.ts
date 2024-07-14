import { AreaTypeEnum,AreaStateEnum } from '../../Enum/Area.Enum';
import { InitialConstants } from '../../Core/Constant/InitialConstant';

export class CreateAreaModel{
    name:string= InitialConstants.DefaultString;
    description :string = InitialConstants.DefaultString;
    areaType :AreaTypeEnum = AreaTypeEnum.Country;
    areaState :AreaStateEnum = AreaStateEnum.Active;
    parentId:string| null= InitialConstants.DefaultString;
    createdById:string = InitialConstants.DefaultString;
}

export class UpdateAreaModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    description :string = InitialConstants.DefaultString;
    areaType :AreaTypeEnum = AreaTypeEnum.Country;
    areaState :AreaStateEnum = AreaStateEnum.Active;
    parentId:string | null= InitialConstants.DefaultString;
    lastUpdatedById:string = InitialConstants.DefaultString;
}

export class DeleteAreaModel{
    id:string= InitialConstants.DefaultString;
    deletedById:string = InitialConstants.DefaultString;
}

export class AreaDtoModel{
    id:string= InitialConstants.DefaultString;
    name:string= InitialConstants.DefaultString;
    description :string = InitialConstants.DefaultString;
    areaType :AreaTypeEnum = AreaTypeEnum.Country;
    areaState :AreaStateEnum = AreaStateEnum.Active;
    parentId:string| null= InitialConstants.DefaultString;
}