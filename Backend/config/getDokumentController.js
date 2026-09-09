import { error } from "node:console";
import { GetApiConnection } from "../service/getApiConnection.js";
import logger from "./logger.js";

export async function getDokumentPreview(dockument, req, res) {
    const DocId = dockument.map(i => i.dockumentID);

    const dockumentPreview = [];

    try {

        for(const id of DocId){
            const response = await GetApiConnection({
                urlInput:`/v1/documents/${id}`,
                req: req,
                res: res,
            })

            if(response instanceof Error) {
                logger.error("Fel vid hämtning av dockument: ", error );
                console.log("Fel uppstog: ", error);
                continue;
            }
            if(response) {
                dockumentPreview.push(response.preview_url)
            }
        }

        return dockumentPreview;
    } catch (error) {
        logger.error("Fel vid hämtning av dockument: ", error );
                console.log("Fel uppstog: ", error)
    }
}
