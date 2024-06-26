// import React from 'react';
// import { Button, ButtonGroup } from '@mui/material';
import RegistersTable from "../../components/registers/RegistersTable";
import RegisterSearchBar from "../../components/registers/RegisterSearchBar";
import Appbar from "../../components/appbar/Appbar";

export const Registers = () => {
  return (
    <div className="bg-white">
      <Appbar />
      <h1 className="flex font-semibold text-5xl justify-center p-3 pt-5">
        Reportes
      </h1>
      <RegisterSearchBar />
      <RegistersTable />
    </div>
  );
};
