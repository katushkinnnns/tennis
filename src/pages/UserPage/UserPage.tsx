import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PROFILE_HEADER_SLOGAN, PROFILE_HEADER_SLOGAN_PARTS } from '@/constants/branding'
import { useUserStore } from '@/stores/userStore'
import { cn } from '@/lib/utils'

const profileSchema = z.object({
  name: z.string().min(2, { message: 'Имя должно содержать минимум 2 символа' }),
  email: z.string().email({ message: 'Введите корректный email' }),
  phone: z
    .string()
    .regex(/^(\+7|8)?[\s-]?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/, {
      message: 'Введите корректный номер телефона',
    }),
})

type ProfileFormValues = z.infer<typeof profileSchema>

/**
 * Страница профиля пользователя с формой редактирования.
 */
export const UserPage = () => {
  const { name, email, phone, setProfile } = useUserStore()

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name, email, phone },
  })

  useEffect(() => {
    form.reset({ name, email, phone })
  }, [name, email, phone, form])

  const handleSubmit = (data: ProfileFormValues) => {
    setProfile({
      name: data.name,
      email: data.email,
      phone: data.phone,
    })
    toast.success('Профиль сохранён')
  }

  return (
    <div className="mx-auto max-w-lg space-y-6">
      <section
        className={cn(
          'rounded-2xl border neon-border bg-gradient-to-br',
          'from-[color-mix(in_oklch,var(--neon-green-light)_12%,white)] via-background',
          'to-[color-mix(in_oklch,var(--neon-green-deep)_8%,white)] px-6 py-8',
        )}
      >
        <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Профиль
        </p>
        <h1
          className="mt-2 text-2xl font-black tracking-wide sm:text-3xl"
          aria-label={PROFILE_HEADER_SLOGAN}
        >
          {PROFILE_HEADER_SLOGAN_PARTS.map((part, index) => (
            <span key={part.text}>
              {index > 0 && ' '}
              <span className={part.className}>{part.text}</span>
            </span>
          ))}
        </h1>
        <p className="mt-3 text-muted-foreground">
          Управляйте личными данными. Информация сохраняется локально.
        </p>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Личные данные</CardTitle>
          <CardDescription>Заполните форму и нажмите «Сохранить»</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Иван" {...field} aria-label="Имя" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ivan@example.com"
                        {...field}
                        aria-label="Email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+7 (999) 123-45-67"
                        {...field}
                        aria-label="Телефон"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Сохранить
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
