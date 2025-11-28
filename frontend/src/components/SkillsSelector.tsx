import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Skill } from '../generated/graphql'
import { useGetSkills } from '../hooks/use-skills'
import { cn } from '../lib/utils'
import { Button } from './ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface SkillsSelectorProps {
  value: Skill[]
  onChange: (skills: Skill[]) => void
}

export function SkillsSelector({ value, onChange }: SkillsSelectorProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const { skills: skillsData } = useGetSkills()

  if (!skillsData) return null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between truncate"
        >
          <span className="truncate">
            {value.length > 0
              ? (() => {
                  const selectedLabels = value
                    .map((s) => skillsData.find((sd) => sd.value === s)?.label)
                    .filter(Boolean)

                  if (selectedLabels.length <= 2) {
                    return selectedLabels.join(', ')
                  } else {
                    const firstTwo = selectedLabels.slice(0, 2)
                    const remaining = selectedLabels.length - 2
                    return `${firstTwo.join(', ')} +${remaining} more`
                  }
                })()
              : t('PROFILE_SKILLS')}
          </span>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={t('PROFILE_SKILLS')} />
          <CommandList>
            <CommandEmpty>No skills found.</CommandEmpty>
            <CommandGroup>
              {skillsData.map((skillOption) => (
                <CommandItem
                  key={skillOption.value}
                  value={skillOption.value}
                  onSelect={() => {
                    const isSelected = value.includes(
                      skillOption.value as Skill
                    )
                    if (isSelected) {
                      onChange(value.filter((s) => s !== skillOption.value))
                    } else {
                      onChange([...value, skillOption.value as Skill])
                    }
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 h-4 w-4',
                      value.includes(skillOption.value as Skill)
                        ? 'opacity-100'
                        : 'opacity-0'
                    )}
                  />
                  {skillOption.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
