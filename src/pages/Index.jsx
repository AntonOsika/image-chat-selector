import React, { useState } from "react";
import { Container, VStack, Input, Button, Image, Text, Box, HStack, useToast } from "@chakra-ui/react";
import { FaPaperPlane } from "react-icons/fa";

const exampleImages = [
  "https://images.unsplash.com/photo-1516117172878-fd2c41f4a759",
  "https://images.unsplash.com/photo-1532009324734-20a7a5813719",
  "https://images.unsplash.com/photo-1524429656589-6633a470097c",
];

const Index = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const toast = useToast();

  const handleImageClick = (url) => {
    setImageUrl(url);
  };

  const handleSubmit = async () => {
    if (!imageUrl || !question) {
      toast({
        title: "Error",
        description: "Please provide both an image URL and a question.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    fetch("https://freider-kive-demo--sglang-inference-web-api.modal.run", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image_url: imageUrl, question }),
    })
      .then((response) => response.json())
      .then((data) => {
        setAnswer(data.answer);
      })
      .catch((error) => {
        toast({
          title: "Error",
          description: "An error occurred while fetching the answer.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      });
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4} width="100%">
        <Text fontSize="2xl">Chat with an Image, powered by Modal</Text>
        <HStack spacing={4}>
          {exampleImages.map((url, index) => (
            <Image
              key={index}
              src={url}
              boxSize="100px"
              objectFit="cover"
              cursor="pointer"
              border={imageUrl === url ? "2px solid blue" : "none"}
              onClick={() => handleImageClick(url)}
            />
          ))}
        </HStack>
        <Input
          placeholder="Enter image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <Input
          placeholder="Ask a question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Button leftIcon={<FaPaperPlane />} colorScheme="blue" onClick={handleSubmit}>
          Submit
        </Button>
        {answer && (
          <Box p={4} mt={4} borderWidth="1px" borderRadius="lg" width="100%">
            <Text fontSize="lg">Answer:</Text>
            <Text>{answer}</Text>
          </Box>
        )}
      </VStack>
    </Container>
  );
};

export default Index;