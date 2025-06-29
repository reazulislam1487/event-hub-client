import React from "react";

import UpComingEvents from "./UpComingEvents";
import LimitedEvents from "./LimitedEvents";
import usePageTitle from "../../hooks/usePageTitle";
import HeroBanner from "./HeroBanner";
import HowItWorks from "./HowItWorks";
import EventServices from "./EventServices";
const Home = () => {
  usePageTitle("Home");

  return (
    <>
      <HeroBanner></HeroBanner>
      <LimitedEvents></LimitedEvents>
      <HowItWorks></HowItWorks>
      <UpComingEvents></UpComingEvents>
      <EventServices></EventServices>
    </>
  );
};

export default Home;
