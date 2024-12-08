import {BombWarning} from "../BombWarning/BombWarning.tsx";
import {FogWarning} from "../FogWarning/FogWarning.tsx";
import {FogPreWarning} from "../FogPreWarning/FogPreWarning.tsx";
import {EggInfo} from "../EggInfo/EggInfo.tsx";

type WarningContainerProps = {
  mapIndex: number
}

export function WarningContainer({mapIndex}: WarningContainerProps) {
  switch (mapIndex) {
    case 0:
      return <EggInfo/>
    case 1:
      return <BombWarning/>
    case 2:
      return <FogPreWarning />
    case 3:
      return <FogWarning />
    default:
      return;
  }
}