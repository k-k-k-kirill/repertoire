import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, Location } from "react-router-dom";
import Dashboard from "../../components/Layouts/Dashboard/Dashboard";
import OpeningList from "../../components/OpeningList/OpeningList";
import { uiFetchOpenings } from "../../redux/branches/slice";
import { getAllOpenings } from "../../redux/branches/slice";
import { getIsAuthenticated } from "../../redux/session/slice";
import { Branch } from "../../types/types";
import { OpeningsLocationState } from "./types";
import "./Openings.scss";

interface OpeningsDispatchProps {
  uiFetchOpenings: typeof uiFetchOpenings;
}

interface OpeningsStateProps {
  openings: Branch[];
  isAuthenticated: boolean;
}

type OpeningsProps = OpeningsDispatchProps & OpeningsStateProps;

const Openings: React.FC<OpeningsProps> = ({
  uiFetchOpenings,
  openings,
  isAuthenticated,
}) => {
  const location: Location = useLocation();
  const locationState: OpeningsLocationState =
    location.state as OpeningsLocationState;

  useEffect(() => {
    if (isAuthenticated && !locationState) {
      uiFetchOpenings();
    }
  }, [isAuthenticated]);

  return (
    <Dashboard>
      <div className="openings">
        {openings ? (
          <OpeningList openings={openings} />
        ) : (
          "There are no openings in your library yet."
        )}
      </div>
    </Dashboard>
  );
};

const mapStateToProps = (state: any) => ({
  openings: getAllOpenings(state),
  isAuthenticated: getIsAuthenticated(state),
});

const mapDispatchToProps = {
  uiFetchOpenings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Openings);
