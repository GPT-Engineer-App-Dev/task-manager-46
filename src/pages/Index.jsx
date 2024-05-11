import { useState } from 'react';
import { Box, Button, Input, List, ListItem, ListIcon, IconButton, Container, Heading, Flex } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = () => {
    if (input.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: input, isCompleted: false }];
      setTasks(newTasks);
      setInput('');
    }
  };

  const handleDeleteTask = (id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  const handleToggleComplete = (id) => {
    const newTasks = tasks.map(task => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(newTasks);
  };

  return (
    <Container maxW="container.md" py={8}>
      <Flex as="nav" mb={4} justify="space-between" align="center">
        <Heading size="lg">Todo App</Heading>
      </Flex>
      <Box mb={4}>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
        />
        <Button onClick={handleAddTask} colorScheme="blue" ml={2}>Add Task</Button>
      </Box>
      <List spacing={3}>
        {tasks.map(task => (
          <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
            <ListIcon as={FaCheckCircle} color={task.isCompleted ? 'green.500' : 'gray.300'} onClick={() => handleToggleComplete(task.id)} cursor="pointer" />
            <Box flex="1" as="span" textDecoration={task.isCompleted ? 'line-through' : 'none'}>
              {task.text}
            </Box>
            <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => handleDeleteTask(task.id)} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Index;