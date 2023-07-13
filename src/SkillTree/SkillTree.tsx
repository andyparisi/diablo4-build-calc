import { type FC } from "react";
import { MapContainer } from "react-leaflet";
import PixiOverlay from "react-leaflet-pixi-overlay";
import styles from "./SkillTree.module.sass";
import "leaflet/dist/leaflet.css";
import "leaflet";

const SkillTree: FC = () => {
  return (
    <div className={styles.SkillTree}>
      <h1>Tree</h1>
      <MapContainer
        className={styles.Map}
        bounds={[
          [sklDtm[clase]["rect"][0], sklDtm[clase]["rect"][1] + 1000],
          [sklDtm[clase]["rect"][2] + 1000, sklDtm[clase]["rect"][3]],
        ]}
      >
        <PixiOverlay markers={[]} />
      </MapContainer>
    </div>
  );
};

export default SkillTree;
