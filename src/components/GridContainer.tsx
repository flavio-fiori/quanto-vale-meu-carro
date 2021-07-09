import { ReactNode } from "react";
import { Flex, useStyleConfig } from "@chakra-ui/react";

type GridContainerProps = {
    children: ReactNode;
};

export function GridContainer({ children, ...rest }: GridContainerProps) {

    const styles = useStyleConfig("GridContainer");

    return(

        <Flex __css={styles} {...rest}>
            { children }
        </Flex>

    )

}