import React from "react";

import { ServicesContainer, ServicesWrapper, ServicesP, ServicesCard, ServicesH1, ServicesH2, ServicesIcon } from "./ServicesElements";
import Button from "./Button";

const Services = () => {

    return (
        <section id="services">
            <ServicesContainer >
                <ServicesH1>
                    Help Today!
                </ServicesH1>
                <ServicesWrapper>
                    <ServicesCard>
                            <ServicesIcon src="icon1.jpg" />
                            <ServicesH2>
                                Contact Nearby Vets
                            </ServicesH2>
                            {/* <a href="/services">Click me </a> */}
                            <Button href="/services">Locate Vets</Button>
                    </ServicesCard>
                    <ServicesCard>
                        <ServicesIcon src="icon2.jpg" />
                        <ServicesH2>
                            Contact Nearby Adoption Center
                        </ServicesH2>
                        <Button href="/services">Locate Shelters</Button>
                    </ServicesCard>
                    <ServicesCard>
                        <ServicesIcon src="icon3.jpg" />
                        <ServicesH2>
                            Visit Old Age Homes
                        </ServicesH2>
                        <Button href="/services">Locate Old Age Homes</Button>
                    </ServicesCard>
                </ServicesWrapper>
            </ServicesContainer>
        </section>
    );
}

export default Services;