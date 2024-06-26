export const useFetchTransactions = (period) => {
  const supabase = useSupabaseClient()
  const transactions = ref([])
  const pending = ref(false)

  const income = computed(
    () => transactions.value.filter(t => t.type === 'income')
  )
  const expense = computed(
    () => transactions.value.filter(t => t.type === 'expense')
  )

  const incomeCount = computed(() => income.value.length)
  const expenseCount = computed(() => expense.value.length)

  const incomeTotal = computed(
    () => income.value.reduce((sum, transaction) => sum + transaction.amount, 0)
  )
  const expenseTotal = computed(
    () => expense.value.reduce((sum, transaction) => sum + transaction.amount, 0)
  )

  const fetchTransactions = async () => {
    pending.value = true
    try {
      const { data } = await useAsyncData(`transactions-${period.value.from.toDateString()}-${period.value.to.toDateString()}`, async () => {
        const { data, error } = await supabase
          .from('transactions')
          .select()
          .gte('created_at', useToISOString(period.value.from))
          .lte('created_at', useToISOString(period.value.to))
          .order('created_at', { ascending: false })

        if (error) return []

        return data
      })

      return data.value
    } finally {
      pending.value = false
    }
  }

  const refresh = async () => transactions.value = await fetchTransactions()

  watch(period, async () => await refresh())

  const transactionsGroupedByDate = computed(() => {
    let grouped = {}

    for (const transaction of transactions.value) {
      const date = useDateTime(transaction.created_at)

      if (!grouped[date]) {
        grouped[date] = []
      }

      grouped[date].push(transaction)
    }

    return grouped
  })

  return {
    transactions: {
      all: transactions,
      grouped: {
        byDate: transactionsGroupedByDate
      },
      income,
      expense,
      incomeTotal,
      expenseTotal,
      incomeCount,
      expenseCount
    },
    refresh,
    pending
  }
}