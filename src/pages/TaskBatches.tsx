import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';

interface TaskBatch {
  id: number;
  name: string;
  tasksCount: number;
  createdAt: string;
  accepted: { current: number; total: number };
  signed: { current: number; total: number };
  paid: { current: number; total: number };
}

const mockData: TaskBatch[] = [
  {
    id: 376,
    name: 'Акт с ОИС',
    tasksCount: 1,
    createdAt: '26.01.2026',
    accepted: { current: 1, total: 1 },
    signed: { current: 1, total: 1 },
    paid: { current: 1, total: 1 },
  },
  {
    id: 374,
    name: 'Выплата аналитикам',
    tasksCount: 2,
    createdAt: '26.01.2026',
    accepted: { current: 2, total: 2 },
    signed: { current: 2, total: 2 },
    paid: { current: 0, total: 2 },
  },
  {
    id: 373,
    name: 'Акт с ОИС',
    tasksCount: 1,
    createdAt: '19.01.2026',
    accepted: { current: 1, total: 1 },
    signed: { current: 1, total: 1 },
    paid: { current: 1, total: 1 },
  },
  {
    id: 372,
    name: 'Выплата аналитикам',
    tasksCount: 1,
    createdAt: '19.01.2026',
    accepted: { current: 1, total: 1 },
    signed: { current: 1, total: 1 },
    paid: { current: 0, total: 1 },
  },
  {
    id: 371,
    name: 'Акт ГПХ (3)',
    tasksCount: 1,
    createdAt: '16.01.2026',
    accepted: { current: 1, total: 1 },
    signed: { current: 1, total: 1 },
    paid: { current: 1, total: 1 },
  },
  {
    id: 367,
    name: 'Выплата аналитикам',
    tasksCount: 1,
    createdAt: '13.01.2026',
    accepted: { current: 1, total: 1 },
    signed: { current: 1, total: 1 },
    paid: { current: 1, total: 1 },
  },
  {
    id: 366,
    name: 'Выплата аналитикам',
    tasksCount: 1,
    createdAt: '12.01.2026',
    accepted: { current: 1, total: 1 },
    signed: { current: 1, total: 1 },
    paid: { current: 0, total: 1 },
  },
  {
    id: 365,
    name: 'Акт с ОИС (1)',
    tasksCount: 1,
    createdAt: '30.12.2025',
    accepted: { current: 1, total: 1 },
    signed: { current: 1, total: 1 },
    paid: { current: 1, total: 1 },
  },
];

const ITEMS_PER_PAGE = 8;

const TaskBatches = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = mockData.filter((batch) =>
    batch.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getProgressPercentage = (current: number, total: number) => {
    return total > 0 ? (current / total) * 100 : 0;
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
          <div className="text-sm text-gray-900 bg-gray-100 font-medium px-3 py-2 rounded">
            Пачки актов
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
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-semibold text-gray-900">Пачки заданий</h1>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <Icon name="Upload" size={16} />
                Загрузить реестр
              </Button>
              <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                <Icon name="Plus" size={16} />
                Создать пачку заданий
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <div className="relative w-80">
              <Icon
                name="Search"
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <Input
                type="text"
                placeholder="Название пачки"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="mb-4 text-sm text-gray-600">
            {filteredData.length} пачка заданий
          </div>

          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID пачки
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Название
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Количество заданий
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Дата создания пачки
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Принято
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Подписано
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Оплачено
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {paginatedData.map((batch) => (
                  <tr key={batch.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-4 text-sm text-gray-900">{batch.id}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{batch.name}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{batch.tasksCount}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{batch.createdAt}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-600">
                          {batch.accepted.current} из {batch.accepted.total}
                        </div>
                        <Progress
                          value={getProgressPercentage(
                            batch.accepted.current,
                            batch.accepted.total
                          )}
                          className="h-2"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-600">
                          {batch.signed.current} из {batch.signed.total}
                        </div>
                        <Progress
                          value={getProgressPercentage(batch.signed.current, batch.signed.total)}
                          className="h-2"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="text-xs text-gray-600">
                          {batch.paid.current} из {batch.paid.total}
                        </div>
                        <Progress
                          value={getProgressPercentage(batch.paid.current, batch.paid.total)}
                          className="h-2"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                  />
                </PaginationItem>

                {[...Array(Math.min(5, totalPages))].map((_, i) => {
                  const page = i + 1;
                  return (
                    <PaginationItem key={page}>
                      <PaginationLink
                        onClick={() => setCurrentPage(page)}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {totalPages > 5 && (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        onClick={() => setCurrentPage(totalPages)}
                        className="cursor-pointer"
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className={
                      currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
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

export default TaskBatches;