import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface Executor {
  id: number;
  name: string;
  phone: string;
}

interface Segment {
  id: number;
  name: string;
  count: number;
}

const mockExecutors: Executor[] = [
  { id: 1, name: 'Синицына Ксения', phone: '+7 (999) 710-25-88' },
  { id: 2, name: 'Проверка Реквизитов', phone: '+7 (000) 250-90-82' },
  { id: 3, name: 'Иванов Иван', phone: '+7 (999) 123-45-67' },
];

const mockSegments: Segment[] = [
  { id: 1, name: 'Водители', count: 45 },
  { id: 2, name: 'Курьеры', count: 32 },
  { id: 3, name: 'Монтажники', count: 18 },
];

export default function CreateTaskBatch() {
  const navigate = useNavigate();
  const [taskName, setTaskName] = useState('');
  const [project, setProject] = useState('');
  const [location, setLocation] = useState('');
  const [remote, setRemote] = useState(false);
  const [deadlineDate, setDeadlineDate] = useState('');
  const [deadlineTime, setDeadlineTime] = useState('');
  const [executionDate, setExecutionDate] = useState('');
  const [executionTime, setExecutionTime] = useState('');
  const [description, setDescription] = useState('');
  const [instructions, setInstructions] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedExecutors, setSelectedExecutors] = useState<number[]>([]);
  const [selectedSegments, setSelectedSegments] = useState<number[]>([]);
  const [proposalMode, setProposalMode] = useState<'executor' | 'all'>('executor');

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const toggleExecutor = (id: number) => {
    setSelectedExecutors((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  const toggleSegment = (id: number) => {
    setSelectedSegments((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    console.log('Creating task batch:', {
      taskName,
      project,
      location,
      remote,
      deadlineDate,
      deadlineTime,
      executionDate,
      executionTime,
      description,
      instructions,
      tags,
      selectedExecutors,
      selectedSegments,
      proposalMode,
    });
    navigate('/task-batches');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/task-batches')}
            className="mb-4 -ml-2"
          >
            <Icon name="ArrowLeft" size={16} className="mr-2" />К заданиям
          </Button>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Создание пачки заданий</h1>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => navigate('/task-batches')}>
                Отменить
              </Button>
              <Button onClick={handleSubmit}>Создать пачку</Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="FileText" size={20} className="text-gray-400" />
                <h2 className="text-lg font-medium">Заполните детали</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="taskName">Название задания</Label>
                  <Input
                    id="taskName"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Назовите задание"
                    className="mt-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Поможет найти задание вам и исполнителю
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="project">Проект</Label>
                    <Select value={project} onValueChange={setProject}>
                      <SelectTrigger id="project" className="mt-2">
                        <SelectValue placeholder="Выберите из списка" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="project1">Проект 1</SelectItem>
                        <SelectItem value="project2">Проект 2</SelectItem>
                        <SelectItem value="project3">Проект 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="location">Место выполнения</Label>
                    <div className="mt-2 space-y-2">
                      <Input
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Введите или выберите из списка"
                        disabled={remote}
                      />
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id="remote"
                          checked={remote}
                          onCheckedChange={(checked) => setRemote(checked as boolean)}
                        />
                        <Label htmlFor="remote" className="font-normal cursor-pointer">
                          Удалённо
                        </Label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Срок выполнения</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        value={deadlineDate}
                        onChange={(e) => setDeadlineDate(e.target.value)}
                        placeholder="ДД.ММ.ГГГГ"
                      />
                      <Input
                        type="time"
                        value={deadlineTime}
                        onChange={(e) => setDeadlineTime(e.target.value)}
                        placeholder="00:00"
                      />
                    </div>
                  </div>

                  <div>
                    <Label>Время выполнения</Label>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      <Input
                        type="date"
                        value={executionDate}
                        onChange={(e) => setExecutionDate(e.target.value)}
                        placeholder="ДД.ММ.ГГГГ"
                      />
                      <Input
                        type="time"
                        value={executionTime}
                        onChange={(e) => setExecutionTime(e.target.value)}
                        placeholder="00:00"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Информация для исполнителя</Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Например, как добраться, требования к внешнему виду и другое"
                    className="mt-2 min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="ListChecks" size={20} className="text-gray-400" />
                <h2 className="text-lg font-medium">Расскажите, что нужно сделать</h2>
              </div>

              <Textarea
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Введите или выберите из справочника"
                className="min-h-[120px]"
              />
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-6">
                <Icon name="Users" size={20} className="text-gray-400" />
                <h2 className="text-lg font-medium">Предложите задание</h2>
              </div>

              <div className="flex gap-2 mb-6 border-b border-gray-200">
                <button
                  onClick={() => setProposalMode('executor')}
                  className={`pb-3 px-4 -mb-px border-b-2 transition ${
                    proposalMode === 'executor'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  Исполнителю
                </button>
                <button
                  onClick={() => setProposalMode('all')}
                  className={`pb-3 px-4 -mb-px border-b-2 transition ${
                    proposalMode === 'all'
                      ? 'border-purple-600 text-purple-600'
                      : 'border-transparent text-gray-500'
                  }`}
                >
                  Всем
                </button>
              </div>

              {proposalMode === 'executor' && (
                <div className="space-y-6">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex gap-3">
                    <Icon name="Info" size={20} className="text-purple-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-purple-900">
                      Вы можете предложить задание нескольким исполнителям или целому сегменту. При
                      этом задание будет опубликовано сразу для всех исполнителей в разделе "Найти
                      задание"
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Выберите исполнителей</Label>
                    <div className="space-y-2">
                      {mockExecutors.map((executor) => (
                        <div
                          key={executor.id}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleExecutor(executor.id)}
                        >
                          <Checkbox
                            checked={selectedExecutors.includes(executor.id)}
                            onCheckedChange={() => toggleExecutor(executor.id)}
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{executor.name}</div>
                            <div className="text-xs text-gray-500">{executor.phone}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="mb-3 block">Или выберите сегмент</Label>
                    <div className="space-y-2">
                      {mockSegments.map((segment) => (
                        <div
                          key={segment.id}
                          className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                          onClick={() => toggleSegment(segment.id)}
                        >
                          <Checkbox
                            checked={selectedSegments.includes(segment.id)}
                            onCheckedChange={() => toggleSegment(segment.id)}
                          />
                          <div className="flex-1">
                            <div className="text-sm font-medium">{segment.name}</div>
                            <div className="text-xs text-gray-500">
                              {segment.count} исполнителей
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {(selectedExecutors.length > 0 || selectedSegments.length > 0) && (
                    <div className="pt-4 border-t border-gray-200">
                      <div className="text-sm font-medium mb-2">
                        Выбрано:{' '}
                        {selectedExecutors.length > 0 &&
                          `${selectedExecutors.length} исполнителей`}
                        {selectedExecutors.length > 0 && selectedSegments.length > 0 && ', '}
                        {selectedSegments.length > 0 &&
                          `${selectedSegments.length} ${
                            selectedSegments.length === 1 ? 'сегмент' : 'сегмента'
                          }`}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-medium mb-4">Заполните детали</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Расскажите, что нужно сделать</li>
                <li>• Предложите задание</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="font-medium mb-4">Комментарий для сотрудников компании</h3>
              <Textarea
                placeholder="Комментарий только для сотрудников компании"
                className="min-h-[100px]"
              />
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Теги</h3>
                <Button variant="link" size="sm" className="text-purple-600 p-0 h-auto">
                  Зачем?
                </Button>
              </div>
              <div className="flex gap-2 mb-3">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Добавить тег"
                />
                <Button onClick={handleAddTag} size="sm">
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="pl-3 pr-1 py-1 flex items-center gap-1"
                    >
                      {tag}
                      <button
                        onClick={() => handleRemoveTag(tag)}
                        className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
