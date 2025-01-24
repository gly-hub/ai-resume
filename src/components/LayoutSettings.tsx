import {
  VStack,
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Divider,
  FormControl,
  FormLabel,
} from '@chakra-ui/react'
import { useResumeStore } from '../store/resumeStore'
import { SectionSorter } from './SectionSorter'

interface FontSizeConfig {
  min: number
  max: number
  default: number
  step: number
}

const fontSizeConfigs: Record<string, FontSizeConfig> = {
  headingTitle: { min: 20, max: 36, default: 28, step: 2 },
  headingSection: { min: 16, max: 24, default: 20, step: 1 },
  bodyNormal: { min: 14, max: 18, default: 16, step: 1 },
  bodySmall: { min: 12, max: 16, default: 14, step: 1 },
}

export function LayoutSettings() {
  const resume = useResumeStore((state) => state.resume)
  const updateTemplate = useResumeStore((state) => state.updateTemplate)

  const handleFontSizeChange = (key: string, value: number) => {
    const [category, type] = key.split('.')
    const newConfig = {
      ...resume.templateConfig,
      fontSize: {
        ...resume.templateConfig.fontSize,
        [category]: {
          ...resume.templateConfig.fontSize[category],
          [type]: `${value}px`
        }
      }
    }
    updateTemplate(resume.template, newConfig)
  }

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          区块排序与显示
        </Text>
        <SectionSorter />
      </Box>

      <Divider />

      <Box>
        <Text fontSize="lg" fontWeight="bold" mb={4}>
          字体大小设置
        </Text>
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>标题字号</FormLabel>
            <Slider
              min={fontSizeConfigs.headingTitle.min}
              max={fontSizeConfigs.headingTitle.max}
              step={fontSizeConfigs.headingTitle.step}
              defaultValue={fontSizeConfigs.headingTitle.default}
              onChange={(value) => handleFontSizeChange('heading.title', value)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>

          <FormControl>
            <FormLabel>区块标题字号</FormLabel>
            <Slider
              min={fontSizeConfigs.headingSection.min}
              max={fontSizeConfigs.headingSection.max}
              step={fontSizeConfigs.headingSection.step}
              defaultValue={fontSizeConfigs.headingSection.default}
              onChange={(value) => handleFontSizeChange('heading.section', value)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>

          <FormControl>
            <FormLabel>正文字号</FormLabel>
            <Slider
              min={fontSizeConfigs.bodyNormal.min}
              max={fontSizeConfigs.bodyNormal.max}
              step={fontSizeConfigs.bodyNormal.step}
              defaultValue={fontSizeConfigs.bodyNormal.default}
              onChange={(value) => handleFontSizeChange('body.normal', value)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>

          <FormControl>
            <FormLabel>辅助文字字号</FormLabel>
            <Slider
              min={fontSizeConfigs.bodySmall.min}
              max={fontSizeConfigs.bodySmall.max}
              step={fontSizeConfigs.bodySmall.step}
              defaultValue={fontSizeConfigs.bodySmall.default}
              onChange={(value) => handleFontSizeChange('body.small', value)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </FormControl>
        </VStack>
      </Box>
    </VStack>
  )
} 