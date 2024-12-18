
import { useState } from 'react';
import { ChakraProvider, Box, Container, VStack, Input, Button, Image, Text, Heading, useToast } from '@chakra-ui/react';

function App() {
    const [prompts, setPrompts] = useState(['']);
    const [collageUrl, setCollageUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handlePromptChange = (index, value) => {
        const newPrompts = [...prompts];
        newPrompts[index] = value;
        setPrompts(newPrompts);
    };

    const addPrompt = () => {
        setPrompts([...prompts, '']);
    };

    const generateCollage = async () => {
        try {
            setLoading(true);
            const validPrompts = prompts.filter(prompt => prompt.trim() !== '');
            
            if (validPrompts.length === 0) {
                toast({
                    title: "Error",
                    description: "Please add at least one prompt",
                    status: "error",
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            const response = await fetch('/api/generate-image', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompts: validPrompts }),
            });

            if (!response.ok) throw new Error('Failed to generate collage');

            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setCollageUrl(url);
            
            toast({
                title: "Success",
                description: "Collage generated successfully!",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Failed to generate collage",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ChakraProvider>
            <Box minH="100vh" bg="gray.50" py={8}>
                <Container maxW="container.md">
                    <VStack spacing={8}>
                        <Heading size="xl" color="purple.600">AI Collage Creator</Heading>
                        
                        <Box w="full" bg="white" p={6} borderRadius="xl" boxShadow="lg">
                            <VStack spacing={4}>
                                {prompts.map((prompt, index) => (
                                    <Input
                                        key={index}
                                        value={prompt}
                                        onChange={(e) => handlePromptChange(index, e.target.value)}
                                        placeholder={`Describe image ${index + 1}`}
                                        size="lg"
                                        focusBorderColor="purple.400"
                                    />
                                ))}
                                
                                <Button 
                                    onClick={addPrompt}
                                    colorScheme="gray"
                                    size="md"
                                    width="full"
                                >
                                    Add Another Prompt
                                </Button>
                                
                                <Button
                                    onClick={generateCollage}
                                    isLoading={loading}
                                    loadingText="Generating..."
                                    colorScheme="purple"
                                    size="lg"
                                    width="full"
                                >
                                    Generate Collage
                                </Button>
                            </VStack>
                        </Box>

                        {collageUrl && (
                            <Box w="full" bg="white" p={6} borderRadius="xl" boxShadow="lg">
                                <VStack spacing={4}>
                                    <Text fontSize="xl" fontWeight="bold">Your Generated Collage</Text>
                                    <Image
                                        src={collageUrl}
                                        alt="Generated Collage"
                                        borderRadius="md"
                                        w="full"
                                    />
                                    <Button
                                        as="a"
                                        href={collageUrl}
                                        download="collage.png"
                                        colorScheme="green"
                                        size="md"
                                    >
                                        Download Collage
                                    </Button>
                                </VStack>
                            </Box>
                        )}
                    </VStack>
                </Container>
            </Box>
        </ChakraProvider>
    );
}

export default App;
