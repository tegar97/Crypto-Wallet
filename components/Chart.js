import React from "react";
import { View, Text } from "react-native";

import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation,
} from "@rainbow-me/animated-charts";
import moment from "moment";
import { COLORS, FONTS, SIZES } from "../constants";
const Chart = ({ containerStyle, chartPrice }) => {
  let startUnixTimeStamp = moment().subtract(7, "days").unix();
  let data = chartPrice
    ? chartPrice.map((item, index) => {
        return {
          x: startUnixTimeStamp + (index + 1) * 3600,
          y: item,
        };
      })
    : [];

  let points = monotoneCubicInterpolation({ data, range: 40 });
  let formatDateTime = (value) => {
    "worklet";
    if (value == "") {
      return "";
    }

    var selectedDate = new Date(value * 1000);

    let date = `0${selectedDate.getDate()}`.slice(-2);
    let month = `0${selectedDate.getMonth() + 1}`.slice(-2);
    return `${date} / ${month}`;
  };

  const formatUsd = (value) => {
    "worklet";
    if (value === "") {
      return "";
    }

    return `$${Number(value).toFixed(2)}`;
  };
  const formatNumber = (value, roundingPoint) => {
    if (value > 1e9) {
      return `${(value / 1e9).toFixed(roundingPoint)}B`;
    } else if (value > 1e6) {
      return `${(value / 1e6).toFixed(roundingPoint)}M`;
    } else if (value > 1e3) {
      return `${(value / 1e3).toFixed(roundingPoint)}K`;
    } else {
      return value.toFixed(roundingPoint);
    }
  };
  const getYAxisLabelValues = () => {
    if (chartPrice != undefined) {
      let minValue = Math.min(...chartPrice);
      let maxValue = Math.max(...chartPrice);

      let midValue = (minValue + maxValue) / 2;

      let higherMidValue = (maxValue + midValue) / 2;
      let lowerMidValue = (minValue + midValue) / 2;

      let roundingPoint = 2;

      return [
        formatNumber(maxValue, roundingPoint),
        formatNumber(higherMidValue, roundingPoint),
        formatNumber(lowerMidValue, roundingPoint),
        formatNumber(minValue, roundingPoint),
      ];
    }
  };
  return (
    <View style={{ ...containerStyle }}>
      {data.length > 0 && (
        <ChartPathProvider data={{ points, smoothingStrategy: "bezier" }}>
          <ChartPath
            height={150}
            width={SIZES.width}
            stroke={COLORS.lightGreen}
            strokeWidth={2}
          />

          <View
            style={{
              position: "absolute",
              left: SIZES.padding,
              top: 0,
              bottom: 0,
              justifyContent: "space-between",
              zIndex: 0,
            }}
          >
            {getYAxisLabelValues().map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{ color: COLORS.lightGray3, ...FONTS.body4 }}
                >
                  {item}
                </Text>
              );
            })}
          </View>

          <ChartDot>
            <View
              style={{
                position: "absolute",
                left: -35,
                width: 80,
                alignItems: "center",
                backgroundColor: COLORS.transparentBlack,
              }}
            >
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: 25,
                  height: 25,
                  borderRadius: 15,
                  backgroundColor: COLORS.white,
                }}
              >
                <View
                  style={{
                    width: 15,
                    height: 15,
                    borderRadius: 10,
                    backgroundColor: COLORS.lightGreen,
                  }}
                ></View>
              </View>

              <ChartYLabel
                format={formatUsd}
                style={{ color: COLORS.white, ...FONTS.body5 }}
              />

              <ChartXLabel
                format={formatDateTime}
                style={{ marginTop: 3, color: COLORS.lightGray3, ...FONTS.h5 }}
              />
            </View>
          </ChartDot>
        </ChartPathProvider>
      )}
    </View>
  );
};

export default Chart;
