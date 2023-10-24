import { FC, ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BonComApp.scss";
import agence from "../../../../../../../types/agence/agence";
import * as AgenceService from "../../../../../../../services/agence.service";
import RouteProgress from "../../../../../../../shared/components/routeProgress/RouteProgress";
import * as IconHi2 from "react-icons/hi2";

const BonComApp: FC = (): ReactElement => {
  const { abr } = useParams<string>();
  const [agence, setAgence] = useState<agence | undefined>(undefined);

  useEffect(() => {
    (async function () {
      const res = await AgenceService.getByAbr(abr!);
      setAgence(res.data);
    })();
  }, []);

  return (
    <div className="bg-boncomapp px-2">
      <h4 className="d-flex align-items-end pt-2">
        <IconHi2.HiHome className="me-2" />
        Agency {agence?.agc} /
        <h6 className="d-flex align-items-middle mb-1">
          <IconHi2.HiClipboardDocumentList className="mx-2" />
          <span>Purchase order</span>
        </h6>
      </h4>

      <RouteProgress />
    </div>
  );
};

export default BonComApp;
