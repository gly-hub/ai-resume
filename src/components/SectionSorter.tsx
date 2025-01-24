import { VStack, Box, HStack, Text, Switch, IconButton, Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useResumeStore } from '../store/resumeStore'
import { DraggableSection } from './DraggableSection'
import { useCallback } from 'react'

export function SectionSorter() {
  const resume = useResumeStore((state) => state.resume)
  const updateSection = useResumeStore((state) => state.updateSection)
  const updateSectionOrder = useResumeStore((state) => state.updateSectionOrder)
  const updateTemplate = useResumeStore((state) => state.updateTemplate)
  const updateResume = useResumeStore((state) => state.updateResume)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = resume.sections.findIndex((section) => section.id === active.id)
    const newIndex = resume.sections.findIndex((section) => section.id === over.id)

    const newSections = arrayMove([...resume.sections], oldIndex, newIndex).map(
      (section, index) => ({
        ...section,
        order: index + 1,
      })
    )

    updateSectionOrder(newSections)
  }

  const handleVisibilityChange = (id: string, visible: boolean) => {
    updateSection(id, visible)
  }

  const handleFontSizeChange = useCallback((type: 'heading' | 'body' | 'secondary', value: number) => {
    console.log('Changing font size:', type, value)
    const newConfig = {
      ...resume.templateConfig,
      fontSize: {
        ...resume.templateConfig.fontSize,
        [type]: `${value}px`
      }
    }
    console.log('New config:', newConfig)
    updateTemplate(resume.template, newConfig)
  }, [resume.template, resume.templateConfig, updateTemplate])

  const handleAvatarSizeChange = useCallback((value: number) => {
    const newConfig = {
      ...resume.templateConfig,
      avatarSize: `${value}px`
    }
    console.log('Updating avatar size:', value, newConfig)
    updateTemplate(resume.template, newConfig)
  }, [resume.template, resume.templateConfig, updateTemplate])

  const sortedSections = [...resume.sections].sort((a, b) => a.order - b.order)

  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontWeight="medium" mb={4}>字体大小设置</Text>
        <VStack spacing={4} align="stretch">
          <Box>
            <Text mb={2}>标题字体大小</Text>
            <Slider
              value={parseInt(resume.templateConfig.fontSize?.heading || '24')}
              min={16}
              max={32}
              step={1}
              onChange={(v) => handleFontSizeChange('heading', v)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Text fontSize="xs">{parseInt(resume.templateConfig.fontSize?.heading || '24')}</Text>
              </SliderThumb>
            </Slider>
          </Box>
          <Box>
            <Text mb={2}>正文字体大小</Text>
            <Slider
              value={parseInt(resume.templateConfig.fontSize?.body || '14')}
              min={12}
              max={20}
              step={1}
              onChange={(v) => handleFontSizeChange('body', v)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Text fontSize="xs">{parseInt(resume.templateConfig.fontSize?.body || '14')}</Text>
              </SliderThumb>
            </Slider>
          </Box>
          <Box>
            <Text mb={2}>次要文字大小</Text>
            <Slider
              value={parseInt(resume.templateConfig.fontSize?.secondary || '12')}
              min={10}
              max={18}
              step={1}
              onChange={(v) => handleFontSizeChange('secondary', v)}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Text fontSize="xs">{parseInt(resume.templateConfig.fontSize?.secondary || '12')}</Text>
              </SliderThumb>
            </Slider>
          </Box>
          <Box>
            <Text mb={2}>头像大小</Text>
            <Slider
              value={parseInt(resume.templateConfig.avatarSize || '100')}
              min={60}
              max={200}
              step={10}
              onChange={handleAvatarSizeChange}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb boxSize={6}>
                <Text fontSize="xs">{parseInt(resume.templateConfig.avatarSize || '100')}</Text>
              </SliderThumb>
            </Slider>
          </Box>
        </VStack>
      </Box>

      <Box>
        <Text fontWeight="medium" mb={4}>区块排序</Text>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sortedSections.map(section => section.id)}
            strategy={verticalListSortingStrategy}
          >
            <VStack spacing={2} align="stretch">
              {sortedSections.map((section) => (
                <DraggableSection
                  key={section.id}
                  section={section}
                  onVisibilityChange={handleVisibilityChange}
                />
              ))}
            </VStack>
          </SortableContext>
        </DndContext>
      </Box>
    </VStack>
  )
} 