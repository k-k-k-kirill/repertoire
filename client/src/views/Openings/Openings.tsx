import React, { useEffect } from "react";
import { connect } from "react-redux";

// Components
import Dashboard from "../../components/Layouts/Dashboard/Dashboard";
import OpeningList from "../../components/OpeningList/OpeningList";

// Action creators
import { uiFetchOpenings } from "../../redux/openings/slice";

// Selectors
import { getAllOpenings } from "../../redux/openings/slice";

// Types
import { OpeningsState } from "../../redux/openings/types";
import { Opening } from "../../types/types";

interface OpeningsDispatchProps {
  uiFetchOpenings: typeof uiFetchOpenings;
}

interface OpeningsStateProps {
  openings: Opening[];
}

type OpeningsProps = OpeningsDispatchProps & OpeningsStateProps;

const Openings: React.FC<OpeningsProps> = ({ uiFetchOpenings, openings }) => {
  useEffect(() => {
    uiFetchOpenings();
  }, []);

  console.log(openings);

  return (
    <Dashboard>
      {openings ? (
        <OpeningList openings={openings} />
      ) : (
        "There are no openings in your library yet."
      )}
    </Dashboard>
  );
};

const mapStateToProps = (state: any) => ({
  openings: getAllOpenings(state),
});

const mapDispatchToProps = {
  uiFetchOpenings,
};

export default connect(mapStateToProps, mapDispatchToProps)(Openings);
