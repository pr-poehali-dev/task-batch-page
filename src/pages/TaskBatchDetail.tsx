import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface Task {
  id: number;
  title: string;
  executor: string;
  status: 'accepted' | 'in_progress' | 'closed' | 'act_created';
  amount: number;
  deadline: string;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: 'Анализ конкурентов',
    executor: 'Иванов И.И.',
    status: 'closed',
    amount: 50000,
    deadline: '25.01.2026',
  },
  {
    id: 2,
    title: 'Разработка стратегии',
    executor: 'Петрова А.С.',
    status: 'in_progress',
    amount: 75000,
    deadline: '30.01.2026',
  },
  {
    id: 3,
    title: 'Аудит системы',
    executor: 'Сидоров П.П.',
    status: 'accepted',
    amount: 60000,
    deadline: '28.01.2026',
  },
  {
    id: 4,
    title: 'Консультация по проекту',
    executor: 'Козлова М.В.',
    status: 'act_created',
    amount: 40000,
    deadline: '24.01.2026',
  },
];

const TaskBatchDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);

  const batchInfo = {
    id: id || '376',
    name: 'Выплата аналитикам',
    totalAmount: 225000,
    createdAt: '15.01.2026',
    acceptedCount: 3,
    inProgressCount: 1,
    closedCount: 2,
    actsCreatedCount: 1,
  };

  const toggleTask = (taskId: number) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const toggleAll = () => {
    if (selectedTasks.length === mockTasks.length) {
      setSelectedTasks([]);
    } else {
      setSelectedTasks(mockTasks.map((t) => t.id));
    }
  };

  const getStatusLabel = (status: Task['status']) => {
    const statusMap = {
      accepted: { label: 'Принято', color: 'bg-blue-100 text-blue-700' },
      in_progress: { label: 'В работе', color: 'bg-yellow-100 text-yellow-700' },
      closed: { label: 'Закрыто', color: 'bg-green-100 text-green-700' },
      act_created: { label: 'Акт сформирован', color: 'bg-purple-100 text-purple-700' },
    };
    return statusMap[status];
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 bg-white border-r border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-purple-600 rounded flex items-center justify-center">
            <Icon name="Briefcase" size={18} className="text-white" />
          </div>
          <span className="font-semibold text-sm">Консоль.про</span>
        </div>

        <div className="mb-6">
          <div className="text-xs text-gray-500 mb-1">Баланс</div>
          <div className="text-sm font-medium">39 616,44 ₽</div>
        </div>

        <nav className="space-y-1">
          {[
            'Маркетплейс',
            'Приглашения',
            'Исполнители',
            'Задания',
            'Акты',
            'Документы',
            'Справочник',
            'Пульс-опрос',
            'Уведомления в МВД',
          ].map((item) => (
            <div
              key={item}
              className="text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded cursor-pointer transition"
            >
              {item}
            </div>
          ))}
          <div
            className="text-sm text-gray-900 bg-gray-100 font-medium px-3 py-2 rounded cursor-pointer"
            onClick={() => navigate('/task-batches')}
          >
            Пачки заданий
          </div>
          <div className="text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded cursor-pointer transition flex items-center gap-2">
            Информатор
            <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded">новое</span>
          </div>
          <div className="text-sm text-gray-700 hover:bg-gray-100 px-3 py-2 rounded cursor-pointer transition">
            Вопросы и ответы
          </div>
        </nav>
      </aside>

      <main className="flex-1 p-8">
        <div className="max-w-7xl">
          <div className="mb-6">
            <Button
              variant="ghost"
              className="gap-2 mb-4"
              onClick={() => navigate('/task-batches')}
            >
              <Icon name="ArrowLeft" size={16} />
              Назад к списку пачек
            </Button>
            <h1 className="text-2xl font-semibold text-gray-900">Пачка заданий #{batchInfo.id}</h1>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div>
                <div className="text-xs text-gray-500 mb-1">ID</div>
                <div className="text-lg font-semibold text-gray-900">{batchInfo.id}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Название</div>
                <div className="text-lg font-semibold text-gray-900">{batchInfo.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Общая сумма пачки</div>
                <div className="text-lg font-semibold text-gray-900">
                  {batchInfo.totalAmount.toLocaleString('ru-RU')} ₽
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Дата создания</div>
                <div className="text-lg font-semibold text-gray-900">{batchInfo.createdAt}</div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-6 border-t border-gray-200 pt-6">
              <div>
                <div className="text-xs text-gray-500 mb-1">Принято заданий</div>
                <div className="text-2xl font-bold text-blue-600">{batchInfo.acceptedCount}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">В работе заданий</div>
                <div className="text-2xl font-bold text-yellow-600">
                  {batchInfo.inProgressCount}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Закрыто заданий</div>
                <div className="text-2xl font-bold text-green-600">{batchInfo.closedCount}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Сформировано актов</div>
                <div className="text-2xl font-bold text-purple-600">
                  {batchInfo.actsCreatedCount}
                </div>
              </div>
            </div>
          </div>

          {selectedTasks.length > 0 && (
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4 flex items-center justify-between">
              <div className="text-sm text-purple-900">
                Выбрано заданий: <span className="font-semibold">{selectedTasks.length}</span>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline" className="gap-2">
                      <Icon name="FileText" size={14} />
                      Создать акт
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Акт ГПХ</DropdownMenuItem>
                    <DropdownMenuItem>Акт с ОИС</DropdownMenuItem>
                    <DropdownMenuItem>Акт самозанятого</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button size="sm" variant="outline" className="gap-2">
                  <Icon name="Mail" size={14} />
                  Отправить уведомление
                </Button>

                <Button size="sm" variant="outline" className="gap-2">
                  <Icon name="Download" size={14} />
                  Экспорт
                </Button>

                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setSelectedTasks([])}
                  className="gap-2"
                >
                  <Icon name="X" size={14} />
                  Отменить
                </Button>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="w-12 px-4 py-3">
                    <Checkbox
                      checked={selectedTasks.length === mockTasks.length}
                      onCheckedChange={toggleAll}
                    />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Название задания
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Исполнитель
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Статус
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Сумма
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Срок
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mockTasks.map((task) => {
                  const status = getStatusLabel(task.status);
                  return (
                    <tr key={task.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-4">
                        <Checkbox
                          checked={selectedTasks.includes(task.id)}
                          onCheckedChange={() => toggleTask(task.id)}
                        />
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{task.id}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{task.title}</td>
                      <td className="px-4 py-4 text-sm text-gray-900">{task.executor}</td>
                      <td className="px-4 py-4">
                        <Badge className={`${status.color} border-0`}>{status.label}</Badge>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">
                        {task.amount.toLocaleString('ru-RU')} ₽
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900">{task.deadline}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="fixed bottom-6 right-6 w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-purple-700 transition">
          <Icon name="MessageCircle" size={24} className="text-white" />
        </div>
      </main>

      <div className="fixed bottom-6 left-64 bg-white rounded-lg border border-gray-200 shadow-sm px-4 py-3 flex items-center gap-3 cursor-pointer hover:shadow-md transition">
        <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600 font-semibold">
          КС
        </div>
        <div>
          <div className="text-sm font-medium text-gray-900">Ксения Синицына</div>
        </div>
        <Icon name="ChevronRight" size={16} className="text-gray-400" />
      </div>
    </div>
  );
};

export default TaskBatchDetail;
