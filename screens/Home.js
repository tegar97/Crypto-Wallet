import React from "react";
import { View, Text } from "react-native";
import MainLayout from "./MainLayout";
import { connect } from "react-redux";
import { getHoldings, getCoinMarket } from "../stores/Market/MarketActions";
import { useFocusEffect } from "@react-navigation/native";
import { COLORS, dummyData, icons, SIZES } from "../constants";
import { BalanceInfo, IconTextButton } from "../components";
import Chart from "../components/Chart";
const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  console.log("ini coins state");
  useFocusEffect(
    React.useCallback(() => {
      console.log("load");
      // eslint-disable-next-line no-undef
      getHoldings((holdings = dummyData.holdings));
      getCoinMarket();
    }, [])
  );
  let totalWallet = myHoldings.reduce((a, b) => a + (b.total || 0), 0);
  let valueChange = myHoldings.reduce(
    (a, b) => a + (b.holding_value_change_7d || 0),
    0
  );

  let percChange = (valueChange / (totalWallet - valueChange)) * 100;
  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray,
        }}
      >
        <BalanceInfo
          title=" Your wallet"
          displayAmount={totalWallet}
          changePct={percChange}
          containerStyle={{ marginTop: 50 }}
        />

        <View
          style={{
            flexDirection: "row",
            marginTop: 30,
            marginBottom: -15,
            paddingHorizontal: SIZES.radius,
          }}
        >
          <IconTextButton
            label="Transfer"
            icon={icons.send}
            containerStyle={{ flex: 1, height: 40, marginRight: SIZES.radius }}
            onPress={() => console.log("Transfer")}
          />
          <IconTextButton
            label="Withdraw"
            icon={icons.withdraw}
            containerStyle={{ flex: 1, height: 40 }}
            onPress={() => console.log("Transfer")}
          />
        </View>
      </View>
    );
  }
  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {renderWalletInfoSection()}
        <Chart
          containerStyle={{ marginTop: SIZES.padding * 2 }}
          chartPrice={coins[0]?.sparkline_in_7d?.price}
        />
      </View>
    </MainLayout>
  );
};

function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (
      holdings,
      currency,
      coinlist,
      orderBy,
      sparkline,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getHoldings(
          holdings,
          currency,
          coinlist,
          orderBy,
          sparkline,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
    getCoinMarket: (
      currency,
      coinList,
      orderBy,
      sparkLine,
      priceChangePerc,
      perPage,
      page
    ) => {
      return dispatch(
        getCoinMarket(
          currency,
          coinList,
          orderBy,
          sparkLine,
          priceChangePerc,
          perPage,
          page
        )
      );
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
