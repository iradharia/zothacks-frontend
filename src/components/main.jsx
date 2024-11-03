import {
  Button,
  Stack,
  HStack,
  Image,
  Box,
  Link,
  Text,
  Tabs,
  TabsContent,
} from "@chakra-ui/react";

import {
  FileUploadDropzone,
  FileUploadList,
  FileUploadRoot,
} from "../../src/components/ui/file-button.jsx";

import { Camera } from "./camera.jsx";
import { Slider } from "./ui/slider";
import { useEffect, useState } from "react";
import { LuFolder, LuUser } from "react-icons/lu";

export function Main() {
  const [value, setValue] = useState([16]);

  const list = [1, 4, 9, 16, 24, 25, 26];

  /*const bizlist = [
    {
      name: "biz1",
      distance: 5,
      link: "https://google.com",
    },
    {
      name: "biz2",
      distance: 10,
      link: "https://google.com",
    },
    {
      name: "biz3",
      distance: 23,
      link: "https://google.com",
    },
  ];*/

  const [files, setFiles] = useState([]);

  const handleDrop = (acceptedFiles) => {
    const files = acceptedFiles.files;

    // Create object URLs for each uploaded file
    const newFiles = files.map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    console.log(newFiles);
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const [data, setData] = useState([]);

  async function classifyImage() {
    const image = files[0].url;

    const response = await fetch(image);
    const blob = await response.blob();

    console.log(image);
    const reader = new FileReader();
    reader.readAsDataURL(blob); // Read the file as a data URL

    reader.onloadend = async () => {
      console.log(reader.result);
      const base64String = reader.result; // This will be the base64 string
      console.log(base64String);
      // Send the base64 string to your server
      try {
        const response = await fetch(
          `https://hacknights-w-2024-template-flask.vercel.app/search`,
          {
            method: "POST",
            body: JSON.stringify({ image: base64String }),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const newData = await response.json();
        const processedData = {
          ...newData,
          filtered: JSON.parse(newData["filtered"][0]),
          unfiltered: JSON.parse(newData["unfiltered"][0]),
        };
        console.log(processedData);
        setData(processedData);
      } catch (error) {
        console.error("Error sending image:", error);
      }
    };

    // const response = await fetch(
    //   "https://hacknights-w-2024-template-flask.vercel.app/search?radius=25&goodwill=true",
    //   {
    //     method: "GET",
    //   }
    // );

    // const newData = await response.json();
    // const processedData = {
    //   ...newData,
    //   filtered: JSON.parse(newData["filtered"][0]),
    //   unfiltered: JSON.parse(newData["unfiltered"][0]),
    // };
    // console.log(newData);

    // setData(processedData);
  }

  return (
    <div style={{ backgroundColor: "white", minHeight: "95vh" }}>
      <HStack
        style={{
          height: "100%",
          padding: 20,
          display: "flex",
          alignItems: "start  ",
        }}
      >
        <Stack
          style={{
            width: "50%",
            height: "100vh",
            backgroundColor: "white",
            display: "flex",
            justifyItems: "center",
            flexDirection: "column",
            paddingTop: "20px",
          }}
        >
          <Stack
            style={{
              color: "teal",
              fontSize: 42,
            }}
          >
            <b
              style={{
                color: "lightorange",
                border: "15px",
              }}
            >
              Upload Item Image
            </b>
          </Stack>

          <HStack wrap="wrap" spacing={4} justify="center">
            {files.map((file, index) => (
              <Stack
                key={index}
                borderWidth="5px"
                borderRadius="lg"
                overflow="hidden"
                width="150px"
              >
                <Image
                  src={file.url}
                  alt={file.name}
                  objectFit="cover"
                  width="100%"
                  height="100px"
                />
                <Text textAlign="center" fontSize="sm"></Text>
              </Stack>
            ))}
          </HStack>

          <Tabs.Root
            style={{
              width: "100%",
              fontSize: "20px",
              color: "teal",
            }}
            defaultValue="Use Webcam"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                borderWidth: "10px",
              }}
            >
              <Tabs.Trigger value="Upload Image">
                <LuUser color="darkgreen" />
                Choose File
              </Tabs.Trigger>
              <Tabs.Trigger value="Use Webcam">
                <LuFolder color="darkgreen" />
                Capture Image
              </Tabs.Trigger>
            </div>

            <Stack>
              <Tabs.Content value="Use Webcam">
                <Camera>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openCamera()}
                  />
                </Camera>
              </Tabs.Content>
            </Stack>

            <Stack
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "nowrap",
                width: "100%",
              }}
            >
              <Stack
                style={{
                  width: "100%",
                  display: "flex",
                }}
              >
                <Tabs.Content value="Upload Image">
                  <FileUploadRoot
                    maxW="xl"
                    alignItems="stretch"
                    maxFiles={1}
                    onFileAccept={handleDrop}
                  >
                    <FileUploadDropzone
                      label="Drag and drop here to upload"
                      description=".png, .jpg up to 5MB"
                    />
                    <FileUploadList />
                  </FileUploadRoot>
                </Tabs.Content>

                <Button onClick={classifyImage}>Send</Button>
              </Stack>
            </Stack>
          </Tabs.Root>
        </Stack>

        <Stack
          style={{
            width: "50%",
            height: "100vh",
            backgroundColor: "white",
          }}
        >
          <Stack>
            <Stack
              style={{
                backgroundColor: "white",
                color: "black",
                display: "flex",
                alignItems: "center",
                paddingTop: "20px",
              }}
            >
              <Stack
                style={{
                  color: "teal",
                  fontSize: 42,
                }}
              >
                <b>Nearby Charities</b>
              </Stack>

              <Slider
                label={`Max Distance: ${value[0] == 24 ? 25 : value} miles`}
                width="350px"
                valueLabelDisplay="auto"
                min={0}
                max={25}
                defaultValue={[0]}
                step={8}
                value={value}
                onValueChange={(e) => setValue([e.value])}
                colorPalette="teal"
                paddingTop="10px"
                fontSize="20px"
                color="lightred"
                paddingBottom="15px"
              />

              <Tabs.Root defaultValue="Filtered Distance">
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <Tabs.Trigger value="Filtered Distance">
                      <LuUser color="darkgreen" />
                      Filtered
                    </Tabs.Trigger>
                    <Tabs.Trigger value="Unfiltered">
                      <LuUser color="darkgreen" />
                      Unfiltered
                    </Tabs.Trigger>
                  </div>
                  <TabsContent value="Filtered Distance">
                    <Stack style={{ overflowY: "scroll", maxHeight: 400 }}>
                      <Stack
                        style={{
                          backgroundColor: "white",
                          width: 400,
                          display: "flex",
                          alignItems: "center",
                          padding: 12,
                          borderRadius: "16px",
                        }}
                      >
                        {data["filtered"]?.["businesses"]
                          ?.filter((item) => {
                            let trueValue = 0;

                            if (value == 8) {
                              trueValue = 5;
                            }
                            if (value == 16) {
                              trueValue = 10;
                            }
                            if (value == 24) {
                              trueValue = 25;
                            }

                            return (
                              (item.distance / 1609).toFixed(2) <= trueValue
                            );
                          })
                          .map((item) => (
                            <Stack
                              key={item}
                              style={{
                                backgroundColor: "white",
                                width: "100%",
                                textAlign: "left",
                                borderRadius: "12px",
                                padding: 12,
                              }}
                            >
                              {item.name}
                              <Stack
                                style={{
                                  textAlign: "right",
                                  paddingRight: 10,
                                  paddingTop: 20,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Link
                                  href={item.url}
                                  target="_blank"
                                  style={{
                                    width: "fit-content",
                                    color: "teal",
                                  }}
                                >
                                  Website Link
                                </Link>
                                <Box>
                                  {(item.distance / 1609).toFixed(2)} miles
                                </Box>
                              </Stack>
                            </Stack>
                          ))}
                      </Stack>
                    </Stack>
                  </TabsContent>
                  <TabsContent value="Unfiltered">
                    <Stack style={{ overflowY: "scroll", maxHeight: 400 }}>
                      <Stack
                        style={{
                          backgroundColor: "white",
                          width: 400,
                          display: "flex",
                          alignItems: "center",
                          padding: 12,
                          borderRadius: "16px",
                        }}
                      >
                        {data["unfiltered"]?.["businesses"]
                          ?.filter((item) => item.distance / 1609 <= value)
                          .map((item) => (
                            <Stack
                              key={item}
                              style={{
                                backgroundColor: "white",
                                width: "100%",
                                textAlign: "left",
                                borderRadius: "12px",
                                padding: 12,
                              }}
                            >
                              {item.name}
                              <Stack
                                style={{
                                  textAlign: "right",
                                  paddingRight: 10,
                                  paddingTop: 20,
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                }}
                              >
                                <Link
                                  href={item.url}
                                  target="_blank"
                                  style={{
                                    width: "fit-content",
                                    color: "teal",
                                  }}
                                >
                                  Website Link
                                </Link>
                                <Box>
                                  {(item.distance / 1609).toFixed(2)} miles
                                </Box>
                              </Stack>
                            </Stack>
                          ))}
                      </Stack>
                    </Stack>
                  </TabsContent>
                </div>
              </Tabs.Root>
            </Stack>
          </Stack>
        </Stack>
      </HStack>
    </div>
  );
}
