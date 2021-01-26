import { useApolloClient } from '@apollo/client'
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  TextField,
} from '@material-ui/core'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import { Controller, useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import { emailPattern } from '@reachdigital/next-ui/useMutationForm/validationPatterns'
import { IsEmailAvailableDocument } from './IsEmailAvailable.gql'
import { SignUpDocument, SignUpMutation, SignUpMutationVariables } from './SignUp.gql'
import onCompleteSignInUp from './onCompleteSignInUp'

// const useStyles = makeStyles(
//   (theme: Theme) => ({
//     form: {
//       display: 'grid',
//       gridRowGap: theme.spacings.sm,
//       gridColumnGap: theme.spacings.xs,
//     },
//   }),
//   { name: 'SignUpForm' },
// )

type SignUpFormProps = {
  emailaddress?: string
}

export default function SignUpForm(props: SignUpFormProps) {
  const { emailaddress } = props
  const classes = useFormStyles()
  const client = useApolloClient()
  const mutationForm = useMutationForm<
    SignUpMutation,
    SignUpMutationVariables & { confirmPassword?: string }
  >(SignUpDocument, {
    defaultValues: { email: emailaddress },
    onComplete: onCompleteSignInUp,
  })
  const { register, errors, handleSubmit, required, watch, control, formState } = mutationForm

  return (
    <form onSubmit={handleSubmit} noValidate className={classes.form}>
      <TextField
        variant='outlined'
        type='text'
        error={!!errors.email}
        id='email'
        name='email'
        label='Email'
        required={required.email}
        inputRef={register({
          required: required.email,
          pattern: { value: emailPattern, message: 'Invalid email address' },
          validate: async (email) => {
            const { data } = await client.query({
              query: IsEmailAvailableDocument,
              variables: { email },
            })

            return (
              Boolean(data?.isEmailAvailable?.is_email_available) ||
              'Email address is not available'
            )
          },
        })}
        helperText={errors.email?.message}
        disabled={formState.isSubmitting}
      />

      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='password'
          // inputProps={{ className: classes.quantityInput, min: 1 }}
          error={!!errors.password}
          id='password'
          name='password'
          label='Password'
          required={required.password}
          inputRef={register({ required: required.password })}
          helperText={errors.password?.message}
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='password'
          error={!!errors.confirmPassword}
          id='confirmPassword'
          name='confirmPassword'
          label='Confirm Password'
          required
          inputRef={register({
            required: true,
            validate: (value) => value === watch('password') || "Paswords don't match",
          })}
          helperText={errors.confirmPassword?.message}
          disabled={formState.isSubmitting}
        />
      </div>
      <Controller
        defaultValue='Dhr.'
        control={control}
        name='prefix'
        render={({ onChange, name, value, onBlur }) => (
          <TextField
            variant='outlined'
            select
            error={!!errors.prefix}
            id='prefix'
            name={name}
            label='Prefix'
            required={required.prefix}
            helperText={errors.prefix?.message}
            disabled={formState.isSubmitting}
            onChange={(e) => onChange(e.target.value)}
            onBlur={onBlur}
            value={value}
          >
            {/* <MenuItem value={undefined} /> */}
            {['Dhr.', 'Mevr.'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <div className={classes.formRow}>
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.firstname}
          id='firstname'
          name='firstname'
          label='First Name'
          required={required.firstname}
          inputRef={register({ required: required.firstname })}
          helperText={errors.firstname?.message}
          disabled={formState.isSubmitting}
        />
        <TextField
          variant='outlined'
          type='text'
          error={!!errors.lastname}
          id='lastname'
          name='lastname'
          label='Last Name'
          required={required.lastname}
          inputRef={register({ required: required.lastname })}
          helperText={errors.lastname?.message}
          disabled={formState.isSubmitting}
        />
      </div>
      <FormControlLabel
        control={<Checkbox name='checkedB' color='primary' />}
        name='isSubscribed'
        inputRef={register({ required: required.isSubscribed })}
        disabled={formState.isSubmitting}
        label='Subscribe to newsletter'
      />

      <FormControl>
        <Button
          type='submit'
          disabled={formState.isSubmitting}
          variant='contained'
          color='primary'
          size='large'
          className={classes.submitButton}
        >
          Continue
        </Button>
        <FormHelperText error={!!errors.submission?.message}>
          {errors.submission?.message}
        </FormHelperText>
      </FormControl>
    </form>
  )
}
