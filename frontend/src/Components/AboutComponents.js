import React from "react";

import "../Components/AboutComponents.css"

const AboutComponents = () => {
    return (
        <div className="components" id="About">

            <div className="sub-component">
                <img className="component-image" src="sub-component-image-1.webp" alt="dog.jpg" />
                <div className="info">
                    <h1>
                        Rescue, love,
                    </h1><h1>
                        care and repeat.
                    </h1>
                    <p>
                        There are 3-4 road accident cases of stray dogs each day. The actual number could be much more because many people don't bother informing the MC or our organisation whenever they accidentally hit an animal. However,a few lucky animals who are treated successfully may be adopted by somebody. With a view to save stray animals, especially dogs and cats,we have created a platform, Sahayyam, which will allow the user to locate its nearby NGOs, civil societies and which have been verified by us, provide the stray the proper treatment they require.
                    </p>
                </div>
            </div>

            <div className="sub-component middle-component">
                <img className="component-image" src="sub-component-image-2.webp" alt="dog.jpg" />
                <div className="info">
                    <h1>
                        Old Age Homes,
                    </h1>
                    <h1>
                        the last hope for society.
                    </h1>
                    <p>
                        Rapid socio-economic change, including more nuclear families, is also making Elder Care management difficult, especially for busy adult children responsible for their older parents’ wellbeing. Managing Home Care for the elderly is a massive challenge as multiple service providers, who often do not talk to each other, are involved in providing that care -nursing agencies, physiotherapists, medical
                        suppliers. Most of these providers are small, unorganized players who extend sub-optimal care quality.
                    </p>
                </div>
            </div>

            <div className="sub-component">
                <img className="component-image" src="sub-component-image-3.webp" alt="dog.jpg" />
                <div className="info">
                    <h1>
                        Care they need,
                    </h1>
                    <h1>
                        love they deserve.
                    </h1>
                    <p>
                        Wandering animals in public places is probably the defining image of India in the West. With
                        wandering animals causing frequent accidents, especially involving two-wheelers.At least 50 per cent of the animals die either immediately or after a few days. India also has fewer government and NGO services that deal with stray cattles. Many countries have organisations like Animal Control, the Humane Society, the SPCA, private shelters, and rescue organisations, that take care of the stray cattles problems.
                    </p>
                </div>
            </div>

        </div>
    );
}

export default AboutComponents;