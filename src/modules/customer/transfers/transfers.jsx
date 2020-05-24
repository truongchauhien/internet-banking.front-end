import React, { useState } from 'react';
import IntraBankInterBank from './intrabank-interbank/intrabank-interbank';
import styles from './transfers.scss';

export const Transfers = (props) => {
    return (
        <IntraBankInterBank />
    );
};

export default Transfers;
