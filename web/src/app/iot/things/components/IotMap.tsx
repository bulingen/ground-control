import { Coordinate } from "@/app/components/mapTypes";
import { ImuStatus, TracedRoute } from "@/app/components/topics";
import { useState } from "react";
import {
  useGnssSubscriber,
  useImuSubscriber,
  useLocalizationSubscriber,
  useNavMissionPublisher,
  useTracedRouteSubscriber,
} from "./useSubscribeToTopic";
import { MapPanel } from "@/app/components/map/MapPanel";

export const IotMap = ({ thingName }: { thingName: string }) => {
  const [vehiclePosition, setVehiclePosition] = useState<Coordinate>();
  const [ghostPosition, setGhostPosition] = useState<Coordinate>();
  const [imuStatus, setImuStatus] = useState<ImuStatus>();
  const [tracedRoutes, setTracedRoutes] = useState<TracedRoute[]>([]);
  useImuSubscriber(thingName, setImuStatus);
  useGnssSubscriber(thingName, setVehiclePosition);
  useLocalizationSubscriber(thingName, setGhostPosition);
  const { publishNavMissionCmd } = useNavMissionPublisher(thingName);

  useTracedRouteSubscriber(thingName, (newSegment: TracedRoute) => {
    setTracedRoutes((prev) => {
      const newList = [...prev, newSegment];
      return newList;
    });
  });

  const onSendKnownPosition = (c: Coordinate) => {
    console.log("Not implemented. Coord:", c);
  };

  const onSendMission = (positions: Coordinate[]) => {
    publishNavMissionCmd({ coordinate_list: positions });
  };

  return (
    <MapPanel
      vehiclePosition={vehiclePosition}
      vehicleRotation={imuStatus?.heading}
      onSendKnownPosition={onSendKnownPosition}
      ghostPosition={ghostPosition}
      tracedRoutes={tracedRoutes}
      onSendMission={onSendMission}
    />
  );
};
