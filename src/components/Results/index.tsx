import { Fragment  } from "react";
import { Divider } from "@chakra-ui/react";

import { Intro } from "./Intro";
import { Info } from "./Info";

export function Results() {

    return (

        <Fragment>

            <Intro />

            <Divider 
                marginY="8"
            />

            <Info />

        </Fragment>

    )

}