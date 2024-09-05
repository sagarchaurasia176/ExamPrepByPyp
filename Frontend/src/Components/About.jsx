import React from "react";
import { Theme } from "@radix-ui/themes";
import { Grid } from "@radix-ui/themes";
import { Box } from "@radix-ui/themes";
import remvimg from "../img/remimg.png";
import pdf from "../img/pdf.png";
import { Flex } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import { Card } from "@radix-ui/themes";
import Typedjs from "../lib/Typedjs";


function About() {
  return (
    <div>
      <div
        className="
          items-center  h-auto  mx-auto"
      >
        <Theme
          className=" text-white
          font-mullish "
        >
          <Grid columns={{ initial: "1", md: "2" }} gap="3" width="auto">
            <Box
              height="64px"
              className= ""
            >
              {/* card with marqureee tool */}
              <Box maxWidth="350px">
                {/* <Blockquote size="2"> */}
                  <marquee behavior="slide" scrolldelay="30" direction="up">
                    <Box maxWidth="40px">
                      <Card className=" cursor-pointer hover:bg-slate-100 transition-all animate-pulse ">
                        <Flex gap="3" align="center">
                          <img className=" w-9" src={pdf} alt="" />
                          <Box>
                            <Text as="div" size="2" weight="bold">
                              BTECH CSE
                            </Text>
                            <Text as="div" size="2" color="gray">
                              QUESTION PAPER
                            </Text>
                          </Box>
                        </Flex>
                      </Card>
                    </Box>
                    <br></br>

                    <Box maxWidth="40px">
                      <Card className=" cursor-pointer hover:bg-slate-100 transition-all animate-pulse ">
                        <Flex gap="3" align="center">
                          <img className=" w-9" src={pdf} alt="" />
                          <Box>
                            <Text as="div" size="2" weight="bold">
                              BTECH AI|ML
                            </Text>
                            <Text as="div" size="2" color="gray">
                              QUESTION PAPER
                            </Text>
                          </Box>
                        </Flex>
                      </Card>
                    </Box>

                    <br></br>
                    <Box maxWidth="40px">
                      <Card className=" cursor-pointer hover:bg-slate-100 transition-all animate-pulse ">
                        <Flex gap="3" align="center">
                          <img className=" w-9" src={pdf} alt="" />
                          <Box>
                            <Text as="div" size="2" weight="bold">
                              BTECH DS
                            </Text>
                            <Text as="div" size="2" color="gray">
                              QUESTION PAPER
                            </Text>
                          </Box>
                        </Flex>
                      </Card>
                    </Box>

                    <br></br>
                    <Box maxWidth="40px">
                      <Card className=" cursor-pointer hover:bg-slate-100 transition-all animate-pulse ">
                        <Flex gap="3" align="center">
                          <img className=" w-9" src={pdf} alt="" />
                          <Box>
                            <Text as="div" size="2" weight="bold">
                              BTECH IOT
                            </Text>
                            <Text as="div" size="2" color="gray">
                              QUESTION PAPER
                            </Text>
                          </Box>
                        </Flex>
                      </Card>
                    </Box>

                    <br></br>
                    <Box maxWidth="40px">
                      <Card className=" cursor-pointer hover:bg-slate-100 transition-all animate-pulse ">
                        <Flex gap="3" align="center">
                          <img className=" w-9" src={pdf} alt="" />
                          <Box>
                            <Text as="div" size="2" weight="bold">
                              BTECH BUSINESS
                            </Text>
                            <Text as="div" size="2" color="gray">
                              QUESTION PAPER
                            </Text>
                          </Box>
                        </Flex>
                      </Card>
                    </Box>
                  </marquee>
                {/* </Blockquote> */}
              </Box>
            </Box>
            <Box height="64px" className="  rounded-xl bg-orange-500">
        <h3
         className=" translate-x-8 transition-all  animate-pulse text-white  p-2 m-auto text-2xl  font-semibold"
         >
          <Typedjs/>
        </h3>
                <img src={remvimg} alt="" />

            </Box>
          </Grid>
        </Theme>
      </div>
    </div>
  );
}

export default About;
