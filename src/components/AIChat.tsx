import React, { useState, useEffect } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Heading,
  Textarea,
  Spinner,
  useToast,
  FormControl,
  FormLabel,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  HStack,
  Collapse,
  useDisclosure,
  IconButton,
} from '@chakra-ui/react';
import { ChatIcon, RepeatIcon, ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { openAIService } from '../services/openai';
import { useResumeStore } from '../store/resumeStore';
import type { Message } from '../types';

interface MessageWithStatus extends Message {
  status?: 'error' | 'success';
  isRetrying?: boolean;
}

export default function AIChat() {
  const toast = useToast();
  const loadFromAI = useResumeStore(state => state.loadFromAI);
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: !openAIService.getConfig() });
  const [config, setConfig] = useState(() => openAIService.getConfig() || {
    apiKey: '',
    apiEndpoint: 'https://api.openai.com/v1',
    model: 'gpt-3.5-turbo',
  });
  const [messages, setMessages] = useState<MessageWithStatus[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [configSaved, setConfigSaved] = useState(false);

  useEffect(() => {
    // 检查是否已经保存了配置
    const savedConfig = openAIService.getConfig();
    if (savedConfig) {
      setConfig(savedConfig);
      setConfigSaved(true);
    }

    if (messages.length === 0) {
      setMessages([{
        role: 'assistant',
        content: `你好！我是你的简历顾问。我会通过对话帮你创建一份专业的简历。

首先，请告诉我你期望申请的职位或者职业发展方向。这样我可以更好地为你提供针对性的建议。`,
        status: 'success'
      }]);
    }
  }, []);

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!config.apiKey) {
      toast({
        title: '请输入 API Key',
        status: 'error',
        duration: 2000,
      });
      return;
    }
    openAIService.setConfig(config);
    setConfigSaved(true);
    toast({
      title: '配置已保存',
      status: 'success',
      duration: 2000,
    });
  };

  const handleSendMessage = async () => {
    if (!configSaved) {
      toast({
        title: '请先保存 OpenAI 配置',
        status: 'warning',
        duration: 2000,
      });
      return;
    }

    if (!newMessage.trim()) return;

    const userMessage: MessageWithStatus = {
      role: 'user',
      content: newMessage,
      status: 'success'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setLoading(true);

    try {
      console.log('发送消息到 OpenAI:', {
        endpoint: config.apiEndpoint,
        model: config.model,
        messages: [...messages, userMessage].map(({ status, isRetrying, ...msg }) => msg)
      });
      
      const assistantMessage = await openAIService.sendMessage(
        [...messages, userMessage].map(({ status, isRetrying, ...msg }) => msg)
      );
      console.log('OpenAI 响应:', assistantMessage);
      
      setMessages(prev => [...prev, { ...assistantMessage, status: 'success' }]);
    } catch (error) {
      console.error('OpenAI API 错误:', {
        error,
        response: error instanceof Error && 'response' in error ? (error as any).response?.data : null,
        status: error instanceof Error && 'response' in error ? (error as any).response?.status : null
      });
      
      let errorMessage = '发送消息失败，请检查配置和网络连接';
      if (error instanceof Error) {
        if ('response' in error && (error as any).response?.data?.error?.message) {
          errorMessage = (error as any).response.data.error.message;
        } else {
          errorMessage = error.message;
        }
      }
      
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: errorMessage,
        status: 'error'
      }]);
      
      toast({
        title: '发送消息失败',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = async (index: number) => {
    const messageToRetry = messages[index];
    if (!messageToRetry || messageToRetry.role !== 'assistant' || messageToRetry.status !== 'error') return;

    // 更新消息状态为重试中
    setMessages(prev => prev.map((msg, i) => 
      i === index ? { ...msg, isRetrying: true } : msg
    ));

    try {
      // 获取到这条消息之前的所有消息
      const previousMessages = messages.slice(0, index);
      const assistantMessage = await openAIService.sendMessage(previousMessages);
      
      // 更新消息
      setMessages(prev => prev.map((msg, i) => 
        i === index ? { ...assistantMessage, status: 'success' } : msg
      ));
    } catch (error) {
      console.error('Retry error:', error);
      toast({
        title: '重试失败',
        description: error instanceof Error ? error.message : '请检查你的配置和网络连接',
        status: 'error',
        duration: 3000,
      });
    } finally {
      // 移除重试状态
      setMessages(prev => prev.map((msg, i) => 
        i === index ? { ...msg, isRetrying: false } : msg
      ));
    }
  };

  const handleGenerateResume = async () => {
    if (!configSaved) {
      toast({
        title: '请先保存 OpenAI 配置',
        description: '点击上方的"保存配置"按钮来保存你的 API Key',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    if (messages.length < 4) {
      toast({
        title: '对话内容不足',
        description: '请先与 AI 顾问进行更多对话，提供足够的信息',
        status: 'warning',
        duration: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      console.log('生成简历，发送到 OpenAI:', {
        endpoint: config.apiEndpoint,
        model: config.model,
        messagesCount: messages.length
      });
      
      const resumeData = await openAIService.generateResume(
        messages.map(({ status, isRetrying, ...msg }) => msg)
      );
      console.log('OpenAI 返回的简历数据:', resumeData);
      
      loadFromAI(resumeData);
      toast({
        title: '简历生成成功',
        description: '已生成简历数据，请切换到"编辑内容"标签页查看和编辑',
        status: 'success',
        duration: 3000,
      });
    } catch (error) {
      console.error('生成简历错误:', {
        error,
        response: error instanceof Error && 'response' in error ? (error as any).response?.data : null,
        status: error instanceof Error && 'response' in error ? (error as any).response?.status : null
      });
      
      let errorMessage = '请检查你的配置和网络连接';
      if (error instanceof Error) {
        if ('response' in error && (error as any).response?.data?.error?.message) {
          errorMessage = (error as any).response.data.error.message;
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: '生成简历失败',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box h="100%" p={4}>
      <Box mb={4}>
        <HStack mb={2} justify="space-between" align="center">
          <Heading size="md">OpenAI 配置</Heading>
          <IconButton
            icon={isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            onClick={onToggle}
            aria-label="Toggle config"
            size="sm"
            variant="ghost"
          />
        </HStack>
        
        <Collapse in={isOpen}>
          <Box as="form" onSubmit={handleConfigSubmit} p={4} borderWidth={1} borderRadius="lg" bg="white">
            <VStack spacing={4}>
              {!configSaved && (
                <Alert status="warning">
                  <AlertIcon />
                  <Box>
                    <AlertTitle>需要配置</AlertTitle>
                    <AlertDescription>
                      请先配置你的 OpenAI API Key 才能使用 AI 助手功能
                    </AlertDescription>
                  </Box>
                </Alert>
              )}
              <FormControl isRequired>
                <FormLabel>API Key</FormLabel>
                <Input
                  type="password"
                  value={config.apiKey}
                  onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
                  placeholder="sk-..."
                />
              </FormControl>
              <FormControl>
                <FormLabel>API Endpoint</FormLabel>
                <Input
                  value={config.apiEndpoint}
                  onChange={(e) => setConfig({ ...config, apiEndpoint: e.target.value })}
                />
              </FormControl>
              <FormControl>
                <FormLabel>模型</FormLabel>
                <Input
                  placeholder="例如：gpt-3.5-turbo"
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" isLoading={loading}>
                保存配置
              </Button>
            </VStack>
          </Box>
        </Collapse>
      </Box>

      <Box 
        borderWidth={1} 
        borderRadius="lg" 
        bg="white" 
        h="calc(100vh - 300px)"
        display="flex"
        flexDirection="column"
      >
        <Box 
          flex={1}
          overflowY="auto" 
          p={4}
          sx={{
            '&::-webkit-scrollbar': {
              width: '8px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              borderRadius: '8px',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
              },
            },
          }}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              p={3}
              mb={3}
              bg={message.role === 'user' ? 'blue.50' : message.status === 'error' ? 'red.50' : 'gray.50'}
              borderRadius="md"
            >
              <HStack mb={2} justify="space-between">
                <Badge colorScheme={message.role === 'user' ? 'blue' : message.status === 'error' ? 'red' : 'gray'}>
                  {message.role === 'user' ? '你' : 'AI 顾问'}
                </Badge>
                {message.status === 'error' && (
                  <Button
                    size="xs"
                    leftIcon={<RepeatIcon />}
                    onClick={() => handleRetry(index)}
                    isLoading={message.isRetrying}
                    colorScheme="red"
                  >
                    重试
                  </Button>
                )}
              </HStack>
              <Text whiteSpace="pre-wrap">{message.content}</Text>
            </Box>
          ))}
          {loading && (
            <Box display="flex" justifyContent="center" p={4}>
              <Spinner />
            </Box>
          )}
        </Box>

        <Box p={4} borderTopWidth={1} bg="white">
          <VStack spacing={4}>
            <Box w="100%">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={configSaved ? "输入你的信息..." : "请先保存 OpenAI 配置"}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                isDisabled={!configSaved}
                rows={3}
                resize="none"
                sx={{
                  '&:focus': {
                    boxShadow: 'none',
                    borderColor: 'blue.500',
                  }
                }}
              />
            </Box>

            <HStack w="100%" spacing={4}>
              <Button
                colorScheme="teal"
                onClick={handleGenerateResume}
                isDisabled={loading || messages.length < 4 || !configSaved}
                leftIcon={<ChatIcon />}
                flex={1}
              >
                生成简历
              </Button>
              <Button
                colorScheme="blue"
                onClick={handleSendMessage}
                isDisabled={!configSaved || !newMessage.trim()}
                isLoading={loading}
                flex={1}
              >
                发送
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
} 