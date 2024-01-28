import React, { useEffect, useRef } from "react";
import { Polyline, PolylineProps } from "react-leaflet";
import "leaflet-arrowheads";

interface ArrowheadsPolylineProps extends PolylineProps {
  arrowheads?: any;
}

export function ArrowheadsPolyline(props: ArrowheadsPolylineProps) {
  const polylineRef = useRef<any>();

  useEffect(() => {
    if (polylineRef.current) {
      const polyline = polylineRef.current;
      if (props.arrowheads) {
        polyline.arrowheads(props.arrowheads);
        polyline._update();
      }
    }
  }, [props.arrowheads]);

  return <Polyline {...props} ref={polylineRef} />;
}
