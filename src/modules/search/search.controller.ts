import { TypedRequest } from "@/shared/dtos/request.dto";
import { Response } from "express";
import { SearchService } from "./search.service";
import { SearchSchemaType } from "./search.schema";

export class SearchController {
    constructor(
        private readonly searchService: SearchService
    ) { }

    search = async (req: TypedRequest<{}, {}, SearchSchemaType>, res: Response) => {
        const search = await this.searchService.search(req.query.q);
        return res.status(200).json(search);
    };
}
